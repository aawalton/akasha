import { type Asking, rowFor } from "../../../readout-asking/readout-asking.module.code.ts"
import { statedAt } from "../../../readout-tier/readout-tier.module.code.ts"

const DAY = "daily-tracking"

const SLEEP_HOURS = "sleep-hours"

const DATE = "date"

const SLEEP_UNKNOWN =
  "the tracking day could not be read, so the sleep is unknown rather than nothing"

export function trackingOn(day: string): Readonly<Record<string, unknown>> {
  return {
    "page-type": DAY,
    where: { [DATE]: { is: day } },
    keys: [SLEEP_HOURS],
    limit: 1,
  }
}

export function sleepIn(values: Readonly<Record<string, unknown>>): number | null {
  return statedAt(values[SLEEP_HOURS])
}

export async function fetchSleepHours(ask: Asking, day: string): Promise<number | null> {
  const row = await rowFor(ask, trackingOn(day), SLEEP_UNKNOWN)
  return row === null ? null : sleepIn(row.values)
}
