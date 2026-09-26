import type { CharacterPlayer } from "akasha/story/character/player/character-player.page-type.types.ts"

export const haremHotelAlan = {
  id: "01a0de29-6810-74d3-8064-9ddb172fe797",
  type: "page-type/character-player",
  slug: "harem-hotel-alan",
  title: "Alan",
  story: "story-played/harem-hotel",
  person: "person/alan",
} as const satisfies CharacterPlayer
