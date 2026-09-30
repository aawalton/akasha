import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const overwhereIiiGarrickDole = {
  id: "01a0f35e-2c9d-784f-8f47-8278272cd4f4",
  type: "page-type/world-relationship",
  slug: "overwhere-iii-garrick-dole",
  title: "Nala and Garrick Dole",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  characters: ["character-player/overwhere-iii-nala", "character-other/overwhere-iii-garrick-dole"],
  relationshipPoints: 5,
  unrevealed: true,
} as const satisfies WorldRelationship
