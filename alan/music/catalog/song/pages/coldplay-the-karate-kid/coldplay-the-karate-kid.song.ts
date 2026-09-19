import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayTheKarateKid = {
  id: "01a0ba64-e93c-76e4-b570-02439acb660d",
  type: "page-type/song",
  slug: "coldplay-the-karate-kid",
  title: "The Karate Kid",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
