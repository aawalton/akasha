import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const overwhereIiiPipCarrow = {
  id: "01a0f3fa-8790-7f54-8db6-6646ce753809",
  type: "page-type/world-relationship",
  slug: "overwhere-iii-pip-carrow",
  title: "Nala and Pip Carrow",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  characters: ["character-player/overwhere-iii-nala", "character-other/overwhere-iii-pip-carrow"],
  relationshipPoints: 2,
  unrevealed: true,
} as const satisfies WorldRelationship
