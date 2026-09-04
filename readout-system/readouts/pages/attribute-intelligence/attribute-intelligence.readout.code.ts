import { type Asking, rowFor } from "../../../readout-asking/readout-asking.module.code.ts"
import { statedAt } from "../../../readout-tier/readout-tier.module.code.ts"

const DAY = "daily-tracking"

const INTELLIGENCE_WORDS = "intelligence-words"

const DATE = "date"

export const WORDS_TO_THE_POINT = 10000

const INTELLIGENCE_UNKNOWN =
  "the tracking day could not be read, so the intelligence is unknown rather than nothing"

export function trackingOn(day: string): Readonly<Record<string, unknown>> {
  return {
    "page-type": DAY,
    where: { [DATE]: { is: day } },
    keys: [INTELLIGENCE_WORDS],
    limit: 1,
  }
}

export function intelligenceIn(values: Readonly<Record<string, unknown>>): number | null {
  const written = statedAt(values[INTELLIGENCE_WORDS])
  return written === null ? null : written / WORDS_TO_THE_POINT
}

export async function fetchIntelligencePoints(ask: Asking, day: string): Promise<number | null> {
  const row = await rowFor(ask, trackingOn(day), INTELLIGENCE_UNKNOWN)
  return row === null ? null : intelligenceIn(row.values)
}
