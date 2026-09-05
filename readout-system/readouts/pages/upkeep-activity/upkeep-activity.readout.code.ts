import { statedAt } from "../../../readout-tier/readout-tier.module.code.ts"

const ACTIVE_CALORIES = "active-calories"

const STRENGTH_VOLUME = "strength-volume"

export const POUNDS_TO_THE_CALORIE = 7

export function heldNothing(values: Readonly<Record<string, unknown>>): boolean {
  return statedAt(values[ACTIVE_CALORIES]) === null && statedAt(values[STRENGTH_VOLUME]) === null
}

export function activityIn(values: Readonly<Record<string, unknown>>): number | null {
  if (heldNothing(values)) return null
  const moved = statedAt(values[ACTIVE_CALORIES]) ?? 0
  const lifted = statedAt(values[STRENGTH_VOLUME])
  return moved + (lifted === null ? 0 : lifted / POUNDS_TO_THE_CALORIE)
}
