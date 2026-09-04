import { type Asking, rowFor } from "../../../readout-asking/readout-asking.module.code.ts"
import { statedAt } from "../../../readout-tier/readout-tier.module.code.ts"

const DAY = "daily-tracking"

const WISDOM_WORDS = "wisdom-words"

const DATE = "date"

export const WORDS_TO_THE_POINT = 10000

const WISDOM_UNKNOWN =
  "the tracking day could not be read, so the wisdom is unknown rather than nothing"

export function trackingOn(day: string): Readonly<Record<string, unknown>> {
  return {
    "page-type": DAY,
    where: { [DATE]: { is: day } },
    keys: [WISDOM_WORDS],
    limit: 1,
  }
}

export function wisdomIn(values: Readonly<Record<string, unknown>>): number | null {
  const written = statedAt(values[WISDOM_WORDS])
  return written === null ? null : written / WORDS_TO_THE_POINT
}

export async function fetchWisdomPoints(ask: Asking, day: string): Promise<number | null> {
  const row = await rowFor(ask, trackingOn(day), WISDOM_UNKNOWN)
  return row === null ? null : wisdomIn(row.values)
}
