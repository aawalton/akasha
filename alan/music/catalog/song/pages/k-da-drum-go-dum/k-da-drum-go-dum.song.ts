import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kDaDrumGoDum = {
  id: "01a0c957-fed7-7d2f-85a3-32099468d102",
  type: "page-type/song",
  slug: "k-da-drum-go-dum",
  title: "DRUM GO DUM",
  artist: "artist/k-da",
  performed: true,
} as const satisfies Song
