import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallGoneHome = {
  id: "01a0b77e-905d-7ad7-a252-79ad07feb9fa",
  type: "page-type/song",
  slug: "paul-cardall-gone-home",
  title: "Gone Home",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
