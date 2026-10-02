import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const overwhereIiiBetHarrow = {
  id: "01a0f177-8422-7f85-b1ca-6d06e61c0f78",
  type: "page-type/world-relationship",
  slug: "overwhere-iii-bet-harrow",
  title: "Nala and Bet Harrow",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  characters: ["character-player/overwhere-iii-nala", "character-other/overwhere-iii-bet-harrow"],
  relationshipPoints: 6,
  unrevealed: true,
} as const satisfies WorldRelationship
