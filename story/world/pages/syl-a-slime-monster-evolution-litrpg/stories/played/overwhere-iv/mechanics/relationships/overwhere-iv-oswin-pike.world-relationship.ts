import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const overwhereIvOswinPike = {
  id: "01a0f250-8146-77ba-b947-b39d35c4b3ce",
  type: "page-type/world-relationship",
  slug: "overwhere-iv-oswin-pike",
  title: "Nala and Oswin Pike",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  characters: ["character-player/overwhere-iv-nala", "character-other/overwhere-iv-oswin-pike"],
  relationshipPoints: 1,
  unrevealed: true,
} as const satisfies WorldRelationship
