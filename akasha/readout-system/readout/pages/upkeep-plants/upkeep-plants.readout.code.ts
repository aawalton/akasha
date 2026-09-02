import type { Asking, Row } from "../../../readout-asking/readout-asking.module.code.ts"
import { statedAt } from "../../../readout-tier/readout-tier.module.code.ts"

const FOOD_ENTRY = "food-entry"

const PLANT_GRAMS = "plant-grams"

const HAPPENED_AT = "happened-at"

const ID = "id"

const GRAMS_UNKNOWN =
  "the day's food entries could not be read, so the plant grams are unknown rather than nothing"

export function entriesBetween(from: string, to: string): Readonly<Record<string, unknown>> {
  return {
    "page-type": FOOD_ENTRY,
    where: { [HAPPENED_AT]: { "at-or-after": from, before: to } },
    keys: [ID, PLANT_GRAMS],
  }
}

export function gramsIn(rows: readonly Row[]): number {
  let total = 0
  for (const row of rows) total += statedAt(row.values[PLANT_GRAMS]) ?? 0
  return total
}

export async function fetchPlantGrams(ask: Asking, from: string, to: string): Promise<number> {
  const asked = await ask(entriesBetween(from, to))
  if (!asked.ok) throw new Error(`${GRAMS_UNKNOWN}: ${asked.why}`)
  return gramsIn(asked.rows)
}
