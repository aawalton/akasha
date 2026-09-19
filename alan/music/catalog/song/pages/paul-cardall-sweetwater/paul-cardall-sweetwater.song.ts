import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallSweetwater = {
  id: "01a0b77c-fa1d-727c-bea9-f036e97e4e97",
  type: "page-type/song",
  slug: "paul-cardall-sweetwater",
  title: "Sweetwater",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
