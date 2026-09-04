import { type Asking, rowFor } from "../../../readout-asking/readout-asking.module.code.ts"
import { statedAt } from "../../../readout-tier/readout-tier.module.code.ts"

const DAY = "daily-tracking"

const ACTIVE_CALORIES = "active-calories"

const DATE = "date"

export const CALORIES_TO_THE_POINT = 400

const ENDURANCE_UNKNOWN =
  "the tracking day could not be read, so the endurance is unknown rather than nothing"

export function trackingOn(day: string): Readonly<Record<string, unknown>> {
  return {
    "page-type": DAY,
    where: { [DATE]: { is: day } },
    keys: [ACTIVE_CALORIES],
    limit: 1,
  }
}

export function enduranceIn(values: Readonly<Record<string, unknown>>): number | null {
  const moved = statedAt(values[ACTIVE_CALORIES])
  return moved === null ? null : moved / CALORIES_TO_THE_POINT
}

export async function fetchEndurancePoints(ask: Asking, day: string): Promise<number | null> {
  const row = await rowFor(ask, trackingOn(day), ENDURANCE_UNKNOWN)
  return row === null ? null : enduranceIn(row.values)
}
