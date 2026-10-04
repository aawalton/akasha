import type { CharacterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.types.ts"

export const climbAlan = {
  id: "01a0f953-d88c-780e-90b0-6dcc12972bd1",
  type: "page-type/character-player",
  slug: "climb-alan",
  title: "Alan",
  story: "story-written/climb",
  person: "person/alan",
  cover: "image/image-129945c5ea14d2f9",
  place: "place/climb-floor-2",
} as const satisfies CharacterPlayer
