import type { Asking, Row } from "../../../readout-asking/readout-asking.module.code.ts"
import { statedAt } from "../../../readout-tier/readout-tier.module.code.ts"

const FOOD_ENTRY = "food-entry"

/**
 * How a food entry spells the keys the day's grams are read off it.
 *
 * A page states its keys as its own file spells them, so these are humped rather than the kebab
 * slugs the old markdown query took. Asked in kebab, this tile read zero every five minutes while
 * 87 food entries stood in akasha: the markdown registry holds no `food-entry` page type and
 * answered no rows without refusing, so the sum came out zero and the scale put zero on the black
 * rung. `plants.domain` holds that a day begun with nothing eaten is a reading of zero, which is
 * exactly what made the fault invisible — the wrong number and the right number are the same
 * number on most mornings.
 */
const PLANT_GRAMS = "plantGrams"

const HAPPENED_AT = "happenedAt"

const ID = "id"

const GRAMS_UNKNOWN =
  "the day's food entries could not be read, so the plant grams are unknown rather than nothing"

export function entriesBetween(from: string, to: string): Readonly<Record<string, unknown>> {
  return {
    pageTypeSlug: FOOD_ENTRY,
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
