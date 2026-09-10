import type { TierColor } from "akasha/readouts/tier/readout-tier.module.code.ts"

const AFFORDABLE = 1

export function costColorAt(multiplier: number | null, surplus: TierColor | null): TierColor {
  if (multiplier === null) return "black"
  if (multiplier === 0) return "green"
  if (multiplier > AFFORDABLE) return "black"
  if (surplus === "blue") return "yellow"
  if (surplus === "green") return "red"
  return "black"
}
