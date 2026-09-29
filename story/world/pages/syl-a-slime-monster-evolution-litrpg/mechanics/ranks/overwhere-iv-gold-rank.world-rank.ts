import type { WorldRank } from "akasha/story/world/mechanics/ranks/world-rank.page-type.types.ts"

export const overwhereIvGoldRank = {
  id: "01a0ed31-9af4-7405-a868-a317cb81e0ce",
  type: "page-type/world-rank",
  slug: "overwhere-iv-gold-rank",
  title: "Gold",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  place: 3,
  description: "The guild's third rank: an adventurer who has cleared a dangerous dungeon.",
} as const satisfies WorldRank
