import { type Asking, rowFor } from "../../../readout-asking/readout-asking.module.code.ts"
import { statedAt } from "../../../readout-tier/readout-tier.module.code.ts"

const DAY = "daily-tracking"

const STRENGTH_VOLUME = "strength-volume"

const DATE = "date"

export const POUNDS_TO_THE_POINT = 2204.62

const STRENGTH_UNKNOWN =
  "the tracking day could not be read, so the strength is unknown rather than nothing"

export function trackingOn(day: string): Readonly<Record<string, unknown>> {
  return {
    "page-type": DAY,
    where: { [DATE]: { is: day } },
    keys: [STRENGTH_VOLUME],
    limit: 1,
  }
}

export function strengthIn(values: Readonly<Record<string, unknown>>): number | null {
  const lifted = statedAt(values[STRENGTH_VOLUME])
  return lifted === null ? null : lifted / POUNDS_TO_THE_POINT
}

export async function fetchStrengthPoints(ask: Asking, day: string): Promise<number | null> {
  const row = await rowFor(ask, trackingOn(day), STRENGTH_UNKNOWN)
  return row === null ? null : strengthIn(row.values)
}
