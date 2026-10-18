import type { Row } from "akasha/alan/harness/readout/modules/asking/readout-asking.module.code.ts"
import { statedAt } from "akasha/alan/harness/readout/modules/tier/readout-tier.computed-property-module.code.ts"

const STRENGTH_VOLUME = "strength-volume"

const ACTIVE_CALORIES = "active-calories"

export const PLANT_GRAMS = "plantGrams"

export const POUNDS_TO_THE_POINT = 2204.62

export const CALORIES_TO_THE_POINT = 200

export const GRAMS_TO_THE_POINT = 100

export function strengthIn(values: Readonly<Record<string, unknown>>): number | null {
  const lifted = statedAt(values[STRENGTH_VOLUME])
  return lifted === null ? null : lifted / POUNDS_TO_THE_POINT
}

export function enduranceIn(values: Readonly<Record<string, unknown>>): number | null {
  const moved = statedAt(values[ACTIVE_CALORIES])
  return moved === null ? null : moved / CALORIES_TO_THE_POINT
}

export function gramsIn(rows: readonly Row[]): number {
  let total = 0
  for (const row of rows) total += statedAt(row.values[PLANT_GRAMS]) ?? 0
  return total
}

export function constitutionIn(grams: number): number {
  return grams / GRAMS_TO_THE_POINT
}
