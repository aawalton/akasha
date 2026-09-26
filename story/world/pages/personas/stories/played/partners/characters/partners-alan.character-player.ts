import type { CharacterPlayer } from "akasha/story/character/player/character-player.page-type.types.ts"

export const partnersAlan = {
  id: "01a0de45-1c8d-788d-8591-71146dafe086",
  type: "page-type/character-player",
  slug: "partners-alan",
  title: "Alan",
  story: "story-played/partners",
  person: "person/alan",
  place: "place/partners-hearthholt",
} as const satisfies CharacterPlayer
