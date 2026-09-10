import {
  AGENT_LAUNCH_OPENED,
  AGENT_LAUNCH_SPAWNED,
} from "../supervising/supervisor-env/supervisor-env.module.code.ts"

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

export function rowLaunchOf(startMode: string): string {
  return startMode === SEAT_MODE_HEADLESS ? AGENT_LAUNCH_SPAWNED : AGENT_LAUNCH_OPENED
}

export function startModeOfRowLaunch(launch: string | null): string | null {
  if (launch === AGENT_LAUNCH_SPAWNED) return SEAT_MODE_HEADLESS
  if (launch === AGENT_LAUNCH_OPENED) return SEAT_MODE_INTERACTIVE
  return null
}
