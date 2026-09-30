import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const overwhereIvGarrettPell = {
  id: "01a0f179-8ef7-7464-9db5-84179ed54352",
  type: "page-type/world-relationship",
  slug: "overwhere-iv-garrett-pell",
  title: "Nala and Garrett Pell",
  world: "world/syl-a-slime-monster-evolution-litrpg",
  characters: ["character-player/overwhere-iv-nala", "character-other/overwhere-iv-garrett-pell"],
  relationshipPoints: 1,
  unrevealed: true,
} as const satisfies WorldRelationship
