import type { WorldRank } from "akasha/story/world/mechanics/ranks/world-rank.page-type.types.ts"

export const overwhereIvDiamondRank = {
  id: "01a0ed31-9af4-79a3-8d84-dc73ab314178",
  type: "page-type/world-rank",
  slug: "overwhere-iv-diamond-rank",
  title: "Diamond",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  place: 4,
  description: "The guild's highest rank, held by a handful of legendary adventurers.",
} as const satisfies WorldRank
