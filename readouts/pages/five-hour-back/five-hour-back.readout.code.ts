import { windowHours } from "../../allowance-window-hours/allowance-window-hours.module.code.ts"
import type { Asking } from "../../asking/readout-asking.module.code.ts"

export async function fetchFiveHourBack(
  ask: Asking,
  now: number = Date.now()
): Promise<number | null> {
  return windowHours(ask, now, "five-hour-percent-used", "five-hour-resets-at", "spent")
}
