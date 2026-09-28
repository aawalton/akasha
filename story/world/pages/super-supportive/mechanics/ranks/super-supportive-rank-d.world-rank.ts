import type { WorldRank } from "akasha/story/world/mechanics/ranks/world-rank.page-type.types.ts"

export const superSupportiveRankD = {
  id: "01a0e9f0-1b85-73d9-ab1d-2953052d0154",
  type: "page-type/world-rank",
  slug: "super-supportive-rank-d",
  title: "D",
  world: "world/super-supportive",
  aliases: ["D-rank"],
  description:
    "The second-lowest Divergence Rank, whose Avowed usually live on the island or in an Avowed zone with a restrictive passport.",
  place: 2,
} as const satisfies WorldRank
