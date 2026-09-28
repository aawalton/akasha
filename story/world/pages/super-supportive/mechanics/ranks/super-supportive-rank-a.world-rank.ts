import type { WorldRank } from "akasha/story/world/mechanics/ranks/world-rank.page-type.types.ts"

export const superSupportiveRankA = {
  id: "01a0e9f0-1b84-7241-8299-a270db80bbe8",
  type: "page-type/world-rank",
  slug: "super-supportive-rank-a",
  title: "A",
  world: "world/super-supportive",
  aliases: ["A-rank"],
  description: "The second-highest Divergence Rank, one of the two usual superhero ranks.",
  place: 5,
} as const satisfies WorldRank
