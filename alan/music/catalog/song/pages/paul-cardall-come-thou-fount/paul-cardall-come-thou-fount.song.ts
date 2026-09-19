import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallComeThouFount = {
  id: "01a0b77e-835f-7e7c-96ff-2fcc1d5da120",
  type: "page-type/song",
  slug: "paul-cardall-come-thou-fount",
  title: "Come Thou Fount",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
