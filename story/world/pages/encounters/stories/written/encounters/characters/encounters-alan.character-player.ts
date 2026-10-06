import type { CharacterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.types.ts"

export const encountersAlan = {
  id: "01a112ff-0b08-7c13-af7e-d5b0e7ed9ab7",
  type: "page-type/character-player",
  slug: "encounters-alan",
  title: "Alan",
  story: "story-written/encounters",
  place: "place/encounters-cabana-bay-room",
  person: "person/alan",
} as const satisfies CharacterPlayer
