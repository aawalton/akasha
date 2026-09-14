import type { TierColor } from "akasha/alan/harness/readouts/modules/tier/readout-tier.module.code.ts"

type Band = {
  readonly surplusOver: number
  readonly costNoMoreThan: number
  readonly color: TierColor
}

const BELOW_EVERY_BAND: TierColor = "black"

const BANDS: readonly Band[] = [
  { surplusOver: 4, costNoMoreThan: 0, color: "blue" },
  { surplusOver: 0, costNoMoreThan: 0, color: "green" },
  { surplusOver: -4, costNoMoreThan: 1, color: "yellow" },
  { surplusOver: -8, costNoMoreThan: 2, color: "red" },
]

export function costColorAt(multiplier: number | null, surplusHours: number | null): TierColor {
  if (multiplier === null || surplusHours === null) return BELOW_EVERY_BAND
  for (const band of BANDS) {
    if (surplusHours > band.surplusOver && multiplier <= band.costNoMoreThan) return band.color
  }
  return BELOW_EVERY_BAND
}
