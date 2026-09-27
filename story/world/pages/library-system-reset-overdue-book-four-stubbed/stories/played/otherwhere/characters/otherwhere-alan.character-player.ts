import type { CharacterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.types.ts"

export const otherwhereAlan = {
  id: "01a0e34f-a2e5-71de-b0c7-51425a39f660",
  type: "page-type/character-player",
  slug: "otherwhere-alan",
  title: "Alan",
  story: "story-played/otherwhere",
  person: "person/alan",
} as const satisfies CharacterPlayer
