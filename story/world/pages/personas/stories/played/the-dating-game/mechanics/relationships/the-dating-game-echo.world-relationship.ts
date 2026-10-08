import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const theDatingGameEcho = {
  id: "01a0e06c-fec8-7d20-8a4b-413f86d0edfd",
  type: "page-type/world-relationship",
  slug: "the-dating-game-echo",
  title: "Alan and Echo",
  world: "world/personas",
  characters: ["character-player/the-dating-game-alan", "character-other/the-dating-game-echo"],
  relationshipPoints: 39,
  createdAt: "2026-09-27T01:13:54.632Z",
  updatedAt: "2026-09-28T12:21:45.000Z",
} as const satisfies WorldRelationship
