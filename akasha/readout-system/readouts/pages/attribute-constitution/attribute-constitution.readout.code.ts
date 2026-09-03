import { type Asking, rowFor } from "../../../readout-asking/readout-asking.module.code.ts"
import { statedAt } from "../../../readout-tier/readout-tier.module.code.ts"

const DAY = "daily-tracking"

const NUTRITION_GRAMS = "nutrition-points"

const DATE = "date"

export const GRAMS_TO_THE_POINT = 100

const CONSTITUTION_UNKNOWN =
  "the tracking day could not be read, so the constitution is unknown rather than nothing"

export function trackingOn(day: string): Readonly<Record<string, unknown>> {
  return {
    "page-type": DAY,
    where: { [DATE]: { is: day } },
    keys: [NUTRITION_GRAMS],
    limit: 1,
  }
}

export function constitutionIn(values: Readonly<Record<string, unknown>>): number | null {
  const eaten = statedAt(values[NUTRITION_GRAMS])
  return eaten === null ? null : eaten / GRAMS_TO_THE_POINT
}

export async function fetchConstitutionPoints(ask: Asking, day: string): Promise<number | null> {
  const row = await rowFor(ask, trackingOn(day), CONSTITUTION_UNKNOWN)
  return row === null ? null : constitutionIn(row.values)
}
