import type { TierColor } from "akasha/alan/harness/readout/modules/tier/readout-tier.module.code.ts"

export const TIER_ORDER: readonly TierColor[] = [
  "black",
  "red",
  "orange",
  "yellow",
  "green",
  "blue",
]

export function isTierColor(said: string): said is TierColor {
  return (TIER_ORDER as readonly string[]).includes(said)
}

type FallDecision =
  | { readonly fell: true; readonly tier: TierColor }
  | { readonly fell: false; readonly why: string }

export function decideFall(opening: TierColor | null, current: TierColor | null): FallDecision {
  if (opening === null) return { fell: false, why: "the night's sleep is not recorded yet" }
  if (current === null) return { fell: false, why: "the reading is unavailable" }
  const from = TIER_ORDER.indexOf(opening)
  const to = TIER_ORDER.indexOf(current)
  if (from === -1 || to === -1) return { fell: false, why: "a tier outside the scale" }
  if (to >= from) return { fell: false, why: `${current} is not below ${opening}` }
  return { fell: true, tier: current }
}
