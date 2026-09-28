import type { WorldMechanic } from "akasha/story/world/mechanics/world-mechanic.page-type.types.ts"

export const superSupportiveDivergenceRank = {
  id: "01a0e9f0-3dfb-7f78-84e0-160f1c71b579",
  type: "page-type/world-mechanic",
  slug: "super-supportive-divergence-rank",
  title: "Divergence Rank",
  world: "world/super-supportive",
  aliases: ["rank"],
  description: "The letter grade of an Avowed's power, from F up through D, C, B and A to S.",
} as const satisfies WorldMechanic
