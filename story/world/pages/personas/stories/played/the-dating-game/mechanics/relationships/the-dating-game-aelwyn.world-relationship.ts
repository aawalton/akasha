import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const theDatingGameAelwyn = {
  id: "01a0e7fc-b7c3-7851-8ceb-0c17b0092e35",
  type: "page-type/world-relationship",
  slug: "the-dating-game-aelwyn",
  title: "Alan and Aelwyn",
  world: "world/personas",
  characters: ["character-player/the-dating-game-alan", "character-other/the-dating-game-aelwyn"],
  relationshipPoints: 18,
  createdAt: "2026-09-28T12:28:14.147Z",
  updatedAt: "2026-09-28T13:48:56.000Z",
} as const satisfies WorldRelationship
