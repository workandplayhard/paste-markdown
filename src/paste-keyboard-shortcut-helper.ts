const unformatted = new WeakMap<HTMLElement, boolean>()

function setUnformattedFlag(event: KeyboardEvent): void {
  const {currentTarget: el} = event
  if (event.code === 'KeyV' && (event.ctrlKey || event.metaKey) && event.shiftKey) {
    unformatted.set(el as HTMLElement, true)
  }
}

function unsetUnformattedFlag(event: ClipboardEvent): void {
  const {currentTarget: el} = event
  unformatted.delete(el as HTMLElement)
}

export function isUnformatted(el: HTMLElement): boolean {
  const isUnformattedState = unformatted.get(el) ?? false

  return isUnformattedState
}

export function installBefore(el: HTMLElement): void {
  el.addEventListener('keydown', setUnformattedFlag)
}

export function installAfter(el: HTMLElement): void {
  el.addEventListener('paste', unsetUnformattedFlag)
}

export function uninstall(el: HTMLElement): void {
  el.removeEventListener('keydown', setUnformattedFlag)
  el.removeEventListener('paste', unsetUnformattedFlag)
}
