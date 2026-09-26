import type { CharacterPlayer } from "akasha/story/character/player/character-player.page-type.types.ts"

export const theDatingGameAlan = {
  id: "01a0de4b-6606-7ac2-ab39-27ef1729b48f",
  type: "page-type/character-player",
  slug: "the-dating-game-alan",
  title: "Alan",
  story: "story-played/the-dating-game",
  person: "person/alan",
} as const satisfies CharacterPlayer
