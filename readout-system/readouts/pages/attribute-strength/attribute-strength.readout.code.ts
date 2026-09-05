import { statedAt } from "../../../readout-tier/readout-tier.module.code.ts"

const STRENGTH_VOLUME = "strength-volume"

export const POUNDS_TO_THE_POINT = 2204.62

export function strengthIn(values: Readonly<Record<string, unknown>>): number | null {
  const lifted = statedAt(values[STRENGTH_VOLUME])
  return lifted === null ? null : lifted / POUNDS_TO_THE_POINT
}
