import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lynLapidOneGoodThing = {
  id: "01a0c95e-aa5d-79b8-8a97-75f153e9f4f5",
  type: "page-type/song",
  slug: "lyn-lapid-one-good-thing",
  title: "one good thing",
  artist: "artist/lyn-lapid",
  performed: true,
} as const satisfies Song
