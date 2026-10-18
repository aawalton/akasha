import {
  constitutionIn,
  gramsIn,
  PLANT_GRAMS,
} from "akasha/alan/attribute/modules/points/attribute-points.computed-property-module.code.ts"
import type { Asking } from "akasha/alan/harness/readout/modules/asking/readout-asking.module.code.ts"

const FOOD_ENTRY = "food-entry"

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

async function fetchPlantGrams(ask: Asking, from: string, to: string): Promise<number> {
  const asked = await ask(entriesBetween(from, to))
  if (!asked.ok) throw new Error(`${GRAMS_UNKNOWN}: ${asked.why}`)
  return gramsIn(asked.rows)
}

export async function fetchConstitutionPoints(
  ask: Asking,
  from: string,
  to: string
): Promise<number> {
  return constitutionIn(await fetchPlantGrams(ask, from, to))
}
