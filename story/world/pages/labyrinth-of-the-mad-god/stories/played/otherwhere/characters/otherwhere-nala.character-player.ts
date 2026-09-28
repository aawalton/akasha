import type { CharacterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.types.ts"

export const otherwhereNala = {
  id: "01a0e982-da6b-7bd0-b601-346b90c70852",
  type: "page-type/character-player",
  slug: "otherwhere-nala",
  title: "Nala",
  cover: "image/image-17f59c7233925455",
  story: "story-played/otherwhere",
  person: "person/alan",
} as const satisfies CharacterPlayer
