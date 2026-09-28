import type { WorldRank } from "akasha/story/world/mechanics/ranks/world-rank.page-type.types.ts"

export const superSupportiveRankB = {
  id: "01a0e9f0-1b85-73a5-abb6-94f0372fca06",
  type: "page-type/world-rank",
  slug: "super-supportive-rank-b",
  title: "B",
  world: "world/super-supportive",
  aliases: ["B-rank"],
  description:
    "The Divergence Rank on the edge of usefulness for hero work; the top fifteen percent of superhumans.",
  place: 4,
} as const satisfies WorldRank
