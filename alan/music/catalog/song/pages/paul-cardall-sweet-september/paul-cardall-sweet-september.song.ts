import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallSweetSeptember = {
  id: "01a0b77e-8ebb-781a-bdb5-f5a1956ad46d",
  type: "page-type/song",
  slug: "paul-cardall-sweet-september",
  title: "Sweet September",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
