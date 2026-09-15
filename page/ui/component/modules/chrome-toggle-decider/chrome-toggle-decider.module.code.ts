const CHROME_TOGGLE_IGNORE_SELECTOR =
  "a, button, input, textarea, select, audio, [role=button], [data-chrome-toggle-ignore]"

export interface ChromeToggleInput {
  readonly target: EventTarget | null
  readonly hasTextSelection: boolean
  readonly isDesktop: boolean
}

export function shouldToggleChrome({
  target,
  hasTextSelection,
  isDesktop,
}: ChromeToggleInput): boolean {
  if (isDesktop) return false
  if (hasTextSelection) return false
  if (target instanceof Element && target.closest(CHROME_TOGGLE_IGNORE_SELECTOR) !== null) {
    return false
  }
  return true
}
