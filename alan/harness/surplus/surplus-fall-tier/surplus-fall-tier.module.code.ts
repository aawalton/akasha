export type TierColor = "black" | "red" | "yellow" | "green" | "blue"

export const TIER_ORDER: readonly TierColor[] = ["black", "red", "yellow", "green", "blue"]

export interface Rung {
  readonly at: number
  readonly color: TierColor
}

export function isTierColor(said: string): said is TierColor {
  return (TIER_ORDER as readonly string[]).includes(said)
}

export function tierAt(reading: number, rungs: readonly Rung[]): TierColor {
  let reached: TierColor = "black"
  for (const rung of rungs) {
    if (rung.color === "black") continue
    if (reading < rung.at) break
    reached = rung.color
  }
  return reached
}

export type FallDecision =
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
