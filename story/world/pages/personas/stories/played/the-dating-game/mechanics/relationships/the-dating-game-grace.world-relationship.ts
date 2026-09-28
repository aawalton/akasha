import type { WorldRelationship } from "akasha/story/world/mechanics/relationships/world-relationship.page-type.types.ts"

export const theDatingGameGrace = {
  id: "01a0e3e0-c71f-71d6-a692-2a42697d2409",
  type: "page-type/world-relationship",
  slug: "the-dating-game-grace",
  title: "Alan and the Woman on the Step",
  world: "world/personas",
  characters: ["character-player/the-dating-game-alan", "character-other/the-dating-game-grace"],
  relationshipPoints: 22,
} as const satisfies WorldRelationship
