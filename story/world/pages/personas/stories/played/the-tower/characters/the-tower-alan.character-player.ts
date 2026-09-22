import type { CharacterPlayer } from "akasha/story/character/player/character-player.page-type.types.ts"

export const theTowerAlan = {
  id: "01a0c9f1-48ea-786d-a65e-7c1f19a32e1f",
  type: "page-type/character-player",
  slug: "the-tower-alan",
  title: "Alan",
  story: "story-played/the-tower",
} as const satisfies CharacterPlayer
