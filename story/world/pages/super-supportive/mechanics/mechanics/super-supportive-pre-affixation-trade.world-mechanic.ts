import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportivePreAffixationTrade = {
  id: "01a0e9f0-3dfb-79f3-ac32-7382d775332d",
  type: "page-type/world-mechanic",
  slug: "super-supportive-pre-affixation-trade",
  title: "Pre-affixation trade",
  world: "world/super-supportive",
  aliases: ["class trade", "trade"],
  description:
    "A swap of assigned classes between two willing selectees of equal rank from the same planet, before affixation.",
} as const satisfies WorldMechanic
