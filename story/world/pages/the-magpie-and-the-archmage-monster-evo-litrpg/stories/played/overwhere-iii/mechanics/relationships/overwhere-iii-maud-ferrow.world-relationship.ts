import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const overwhereIiiMaudFerrow = {
  id: "01a0f3b2-49a6-716c-acf3-5b16575842fe",
  type: "page-type/world-relationship",
  slug: "overwhere-iii-maud-ferrow",
  title: "Nala and Maud Ferrow",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  characters: ["character-player/overwhere-iii-nala", "character-other/overwhere-iii-maud-ferrow"],
  relationshipPoints: 5,
  unrevealed: true,
} as const satisfies WorldRelationship
