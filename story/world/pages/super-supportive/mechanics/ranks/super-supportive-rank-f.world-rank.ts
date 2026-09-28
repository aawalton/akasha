import type { WorldRank } from "akasha/story/world/mechanics/ranks/world-rank.page-type.types.ts"

export const superSupportiveRankF = {
  id: "01a0e9f0-1b85-775b-9a13-fb9428909d63",
  type: "page-type/world-rank",
  slug: "super-supportive-rank-f",
  title: "F",
  world: "world/super-supportive",
  aliases: ["F-rank"],
  description:
    "The lowest Divergence Rank, whose Avowed usually live on the island or in an Avowed zone.",
  place: 1,
} as const satisfies WorldRank
