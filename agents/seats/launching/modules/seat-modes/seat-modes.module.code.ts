export const SEAT_MODE_INTERACTIVE = "interactive"

export const SEAT_MODE_HEADLESS = "headless"

export const SEAT_MODES: readonly string[] = [SEAT_MODE_INTERACTIVE, SEAT_MODE_HEADLESS]

export const HEADLESS_FLAG = "--headless"

export function isSeatMode(value: string): boolean {
  return value === SEAT_MODE_INTERACTIVE || value === SEAT_MODE_HEADLESS
}

export function runningModeIn(argv: readonly string[]): string {
  return argv.includes(HEADLESS_FLAG) ? SEAT_MODE_HEADLESS : SEAT_MODE_INTERACTIVE
}
