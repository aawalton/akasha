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
  createdAt: "2026-09-28T21:33:50.971Z",
  updatedAt: "2026-09-28T21:33:54.000Z",
} as const satisfies WorldMechanic
