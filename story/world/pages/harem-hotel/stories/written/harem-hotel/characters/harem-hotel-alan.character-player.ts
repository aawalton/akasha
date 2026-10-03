import type { CharacterPlayer } from "akasha/story/world/characters/character-player/character-player.page-type.types.ts"

export const haremHotelAlan = {
  id: "01a0e821-409b-7917-9bd0-9865eba7f1e5",
  type: "page-type/character-player",
  slug: "harem-hotel-alan",
  title: "Alan",
  story: "story-written/harem-hotel",
  person: "person/alan",
  place: "place/harem-hotel-floor-4",
} as const satisfies CharacterPlayer
