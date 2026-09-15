import { fetchPlantGrams } from "akasha/alan/harness/plant/readouts/upkeep-plants/upkeep-plants.readout.reading.code.ts"
import type { Asking } from "akasha/alan/harness/readout/modules/asking/readout-asking.module.code.ts"

export const GRAMS_TO_THE_POINT = 100

export function constitutionIn(grams: number): number {
  return grams / GRAMS_TO_THE_POINT
}

export async function fetchConstitutionPoints(
  ask: Asking,
  from: string,
  to: string
): Promise<number> {
  return constitutionIn(await fetchPlantGrams(ask, from, to))
}
