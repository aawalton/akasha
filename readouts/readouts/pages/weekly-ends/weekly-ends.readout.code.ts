import { windowHours } from "../../../allowance-window-hours/allowance-window-hours.module.code.ts"
import type { Asking } from "../../../readout-asking/readout-asking.module.code.ts"

export async function fetchWeeklyEnds(
  ask: Asking,
  now: number = Date.now()
): Promise<number | null> {
  return windowHours(ask, now, "seven-day-percent-used", "seven-day-resets-at", "left")
}
