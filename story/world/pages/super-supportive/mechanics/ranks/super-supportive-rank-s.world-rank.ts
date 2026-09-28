import type { WorldRank } from "akasha/story/world/mechanics/ranks/world-rank.page-type.types.ts"

export const superSupportiveRankS = {
  id: "01a0e9f0-1b85-7b0e-925a-9fecae3c3f5a",
  type: "page-type/world-rank",
  slug: "super-supportive-rank-s",
  title: "S",
  world: "world/super-supportive",
  aliases: ["S-rank"],
  description: "The highest lettered Divergence Rank, the 99th percentile of all superhumans.",
  place: 6,
} as const satisfies WorldRank
