import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const overwhereIvDell = {
  id: "01a0f206-f1f9-7b60-bcc5-f400b8883ec9",
  type: "page-type/world-relationship",
  slug: "overwhere-iv-dell",
  title: "Nala and Dell",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  characters: ["character-player/overwhere-iv-nala", "character-other/overwhere-iv-dell"],
  relationshipPoints: 1,
  unrevealed: true,
} as const satisfies WorldRelationship
