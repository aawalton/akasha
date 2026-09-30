import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const overwhereIvRennickHale = {
  id: "01a0f19b-7fcd-7400-98bc-b73ab2f0a5cf",
  type: "page-type/world-relationship",
  slug: "overwhere-iv-rennick-hale",
  title: "Nala and Rennick Hale",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  characters: ["character-player/overwhere-iv-nala", "character-other/overwhere-iv-rennick-hale"],
  relationshipPoints: 1,
  unrevealed: true,
} as const satisfies WorldRelationship
