import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const overwhereIvWat = {
  id: "01a0f206-f1f9-7477-8f13-656831c4e12a",
  type: "page-type/world-relationship",
  slug: "overwhere-iv-wat",
  title: "Nala and Wat",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  characters: ["character-player/overwhere-iv-nala", "character-other/overwhere-iv-wat"],
  relationshipPoints: 1,
  unrevealed: true,
} as const satisfies WorldRelationship
