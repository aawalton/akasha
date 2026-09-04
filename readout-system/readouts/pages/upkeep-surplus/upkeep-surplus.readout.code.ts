import { type Asking, rowFor } from "../../../readout-asking/readout-asking.module.code.ts"
import { statedAt } from "../../../readout-tier/readout-tier.module.code.ts"

const DAY = "daily-tracking"

const SURPLUS_HOURS = "surplus-hours"

const SLEEP_HOURS = "sleep-hours"

const SPEND_HOURS = "spend-hours"

const DATE = "date"

const SURPLUS_UNKNOWN =
  "the tracking day could not be read, so the surplus is unknown rather than nothing"

export function trackingOn(day: string): Readonly<Record<string, unknown>> {
  return {
    "page-type": DAY,
    where: { [DATE]: { is: day } },
    keys: [SURPLUS_HOURS, SLEEP_HOURS, SPEND_HOURS],
    limit: 1,
  }
}

export function heldNothing(values: Readonly<Record<string, unknown>>): boolean {
  return statedAt(values[SLEEP_HOURS]) === null && statedAt(values[SPEND_HOURS]) === null
}

export function surplusIn(values: Readonly<Record<string, unknown>>): number | null {
  if (heldNothing(values)) return null
  return statedAt(values[SURPLUS_HOURS])
}

export async function fetchSurplusHours(ask: Asking, day: string): Promise<number | null> {
  const row = await rowFor(ask, trackingOn(day), SURPLUS_UNKNOWN)
  return row === null ? null : surplusIn(row.values)
}
