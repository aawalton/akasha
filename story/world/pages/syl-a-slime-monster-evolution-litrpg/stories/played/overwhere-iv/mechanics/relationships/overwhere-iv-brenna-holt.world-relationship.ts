import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const overwhereIvBrennaHolt = {
  id: "01a0f206-f1f9-76da-8567-26d90ff31842",
  type: "page-type/world-relationship",
  slug: "overwhere-iv-brenna-holt",
  title: "Nala and Brenna Holt",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  characters: ["character-player/overwhere-iv-nala", "character-other/overwhere-iv-brenna-holt"],
  relationshipPoints: 9,
  unrevealed: true,
} as const satisfies WorldRelationship
