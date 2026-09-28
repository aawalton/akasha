import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const theDatingGameTalia = {
  id: "01a0e84a-5dbb-7526-886a-aba6dfe5fcd2",
  type: "page-type/world-relationship",
  slug: "the-dating-game-talia",
  title: "Alan and the Woman on the Porch",
  world: "world/personas",
  characters: ["character-player/the-dating-game-alan", "character-other/the-dating-game-talia"],
  relationshipPoints: 0,
} as const satisfies WorldRelationship
