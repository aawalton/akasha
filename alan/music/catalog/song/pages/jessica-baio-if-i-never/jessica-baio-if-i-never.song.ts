import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioIfINever = {
  id: "01a0c622-24ba-7d78-b6ba-71fb31011960",
  type: "page-type/song",
  slug: "jessica-baio-if-i-never",
  title: "if i never",
  artist: "artist/jessica-baio",
  performed: true,
} as const satisfies Song
