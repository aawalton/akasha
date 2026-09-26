import type { CharacterPlayer } from "akasha/story/character/player/character-player.page-type.types.ts"

export const partnersIiAlan = {
  id: "01a0de46-e37b-712e-9549-6f71fe336006",
  type: "page-type/character-player",
  slug: "partners-ii-alan",
  title: "Alan",
  story: "story-played/partners-ii",
  person: "person/alan",
  place: "place/partners-ii-hearthholt",
} as const satisfies CharacterPlayer
