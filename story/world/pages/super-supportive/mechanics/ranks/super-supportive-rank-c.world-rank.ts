import type { WorldRank } from "akasha/story/world/mechanics/ranks/world-rank.page-type.types.ts"

export const superSupportiveRankC = {
  id: "01a0e9f0-1b85-7f17-8a45-1908b01fe83c",
  type: "page-type/world-rank",
  slug: "super-supportive-rank-c",
  title: "C",
  world: "world/super-supportive",
  aliases: ["C-rank"],
  description:
    "The middle Divergence Rank, not superhero level, though a lucky skill pick can make it useful.",
  place: 3,
} as const satisfies WorldRank
