import type { Asking } from "@akasha/readouts/readout-asking"
import { fetchPlantGrams } from "@akasha/readouts/upkeep-plants"

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
