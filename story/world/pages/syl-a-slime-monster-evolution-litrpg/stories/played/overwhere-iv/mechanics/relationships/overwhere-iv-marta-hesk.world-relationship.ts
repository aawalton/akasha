import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const overwhereIvMartaHesk = {
  id: "01a0f4a3-8215-719d-9c9c-73a67fc8b933",
  type: "page-type/world-relationship",
  slug: "overwhere-iv-marta-hesk",
  title: "Nala and Marta Hesk",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  characters: ["character-player/overwhere-iv-nala", "character-other/overwhere-iv-marta-hesk"],
  relationshipPoints: 1,
  unrevealed: true,
} as const satisfies WorldRelationship
