import type { Asking } from "akasha/alan/harness/readouts/asking/readout-asking.module.code.ts"
import { windowHours } from "akasha/alan/harness/readouts/modules/allowance-window-hours/allowance-window-hours.module.code.ts"

export async function fetchFiveHourBack(
  ask: Asking,
  now: number = Date.now()
): Promise<number | null> {
  return windowHours(ask, now, "five-hour-percent-used", "five-hour-resets-at", "spent")
}
