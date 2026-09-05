import { statedAt } from "../../../readout-tier/readout-tier.module.code.ts"

const ACTIVE_CALORIES = "active-calories"

export const CALORIES_TO_THE_POINT = 400

export function enduranceIn(values: Readonly<Record<string, unknown>>): number | null {
  const moved = statedAt(values[ACTIVE_CALORIES])
  return moved === null ? null : moved / CALORIES_TO_THE_POINT
}
