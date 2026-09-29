import type { WorldRank } from "akasha/story/world/mechanics/ranks/world-rank.page-type.types.ts"

export const overwhereIvBronzeRank = {
  id: "01a0ed31-9af3-74ae-b3d5-1594951ef8c2",
  type: "page-type/world-rank",
  slug: "overwhere-iv-bronze-rank",
  title: "Bronze",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  place: 1,
  description: "The guild's first rank, where every new adventurer starts.",
} as const satisfies WorldRank
