import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const overwhereIiiIvyMarsh = {
  id: "01a0f35e-2c9d-7e62-b4c9-9c7f4ca2c667",
  type: "page-type/world-relationship",
  slug: "overwhere-iii-ivy-marsh",
  title: "Nala and Ivy Marsh",
  world: "world/the-magpie-and-the-archmage-monster-evo-litrpg",
  characters: ["character-player/overwhere-iii-nala", "character-other/overwhere-iii-ivy-marsh"],
  relationshipPoints: 6,
  unrevealed: true,
} as const satisfies WorldRelationship
