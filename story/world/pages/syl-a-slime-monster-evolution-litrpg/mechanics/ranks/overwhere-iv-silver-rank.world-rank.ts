import type { WorldRank } from "akasha/story/world/mechanics/ranks/world-rank.page-type.types.ts"

export const overwhereIvSilverRank = {
  id: "01a0ed31-9af4-70da-b3f5-ca1c4f5c20d5",
  type: "page-type/world-rank",
  slug: "overwhere-iv-silver-rank",
  title: "Silver",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  place: 2,
  description: "The guild's second rank: a proven adventurer trusted with real danger.",
} as const satisfies WorldRank
