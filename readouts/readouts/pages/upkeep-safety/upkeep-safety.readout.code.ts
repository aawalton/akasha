import { type Asking, rowFor } from "../../../readout-asking/readout-asking.module.code.ts"
import { statedAt } from "../../../readout-tier/readout-tier.module.code.ts"

const SESSION = "session-tracking"

const SAFETY_LEVEL = "safety-level"

const END_TIME = "end-time"

const START_TIME = "start-time"

const DAILY_TRACKING = "daily-tracking"

const LEVEL_UNKNOWN =
  "the open session could not be read, so the safety level is unknown rather than nothing"

const DAY_LEVEL_UNKNOWN =
  "the day's sessions could not be read, so the safety level is unknown rather than nothing"

export const OPEN_SESSION = {
  "page-type": SESSION,
  where: { [END_TIME]: { empty: true } },
  "sort-by": START_TIME,
  descending: true,
  limit: 1,
} as const

export function levelOn(dayId: string): Readonly<Record<string, unknown>> {
  return {
    "page-type": SESSION,
    where: { [DAILY_TRACKING]: { is: dayId }, [SAFETY_LEVEL]: { empty: false } },
    "sort-by": START_TIME,
    descending: true,
    limit: 1,
  }
}

export function levelIn(values: Readonly<Record<string, unknown>>): number | null {
  return statedAt(values[SAFETY_LEVEL])
}

export async function fetchSafetyLevel(ask: Asking): Promise<number | null> {
  const row = await rowFor(ask, OPEN_SESSION, LEVEL_UNKNOWN)
  return row === null ? null : levelIn(row.values)
}

export async function fetchSafetyLevelOnDay(ask: Asking, dayId: string): Promise<number | null> {
  const row = await rowFor(ask, levelOn(dayId), DAY_LEVEL_UNKNOWN)
  return row === null ? null : levelIn(row.values)
}
