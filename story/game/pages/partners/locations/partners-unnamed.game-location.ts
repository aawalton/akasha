import type { GameLocation } from "akasha/story/game/game-location/game-location.page-type.types.ts"

export const partnersUnnamed = {
  id: "01a0c663-0c29-7d53-b8e7-375c5ed2a7df",
  type: "page-type/game-location",
  slug: "partners-unnamed",
  title: "the Understair",
  game: "story-game/partners",
  within: "game-location/partners-hearthholt",
} as const satisfies GameLocation
