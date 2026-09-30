import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const overwhereIvTam = {
  id: "01a0f1e6-6ae0-71cf-9991-5f2e7ae008a7",
  type: "page-type/world-relationship",
  slug: "overwhere-iv-tam",
  title: "Nala and Tam",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  characters: ["character-player/overwhere-iv-nala", "character-other/overwhere-iv-tam"],
  relationshipPoints: 2,
  unrevealed: true,
} as const satisfies WorldRelationship
