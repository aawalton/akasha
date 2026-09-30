import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const overwhereIiiDunstanHarrow = {
  id: "01a0f341-996d-7cd1-b86b-0d66fdaba7d3",
  type: "page-type/world-relationship",
  slug: "overwhere-iii-dunstan-harrow",
  title: "Nala and Dunstan Harrow",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  characters: [
    "character-player/overwhere-iii-nala",
    "character-other/overwhere-iii-dunstan-harrow",
  ],
  relationshipPoints: 0,
  unrevealed: true,
} as const satisfies WorldRelationship
