import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const theDatingGameEcho = {
  id: "01a0e06c-fec8-7d20-8a4b-413f86d0edfd",
  type: "page-type/world-relationship",
  slug: "the-dating-game-echo",
  title: "Alan and the Woman on the Boulder",
  world: "world/personas",
  characters: ["character-player/the-dating-game-alan", "character-other/the-dating-game-echo"],
  relationshipPoints: 20,
} as const satisfies WorldRelationship
