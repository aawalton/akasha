import type { Asking } from "../../../readout-asking/readout-asking.module.code.ts"
import { fetchPlantGrams } from "../upkeep-plants/upkeep-plants.readout.code.ts"

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
