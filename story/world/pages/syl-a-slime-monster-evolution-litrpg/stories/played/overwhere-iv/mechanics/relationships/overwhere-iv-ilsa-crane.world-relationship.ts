import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const overwhereIvIlsaCrane = {
  id: "01a0f1bf-be44-71f2-9c99-e8fda7504dc7",
  type: "page-type/world-relationship",
  slug: "overwhere-iv-ilsa-crane",
  title: "Nala and Ilsa Crane",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  characters: ["character-player/overwhere-iv-nala", "character-other/overwhere-iv-ilsa-crane"],
  relationshipPoints: 7,
  unrevealed: true,
} as const satisfies WorldRelationship
