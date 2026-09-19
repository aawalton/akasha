import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jisooFlower = {
  id: "01a0b779-999e-7dc7-ac18-c435a129d134",
  type: "page-type/song",
  slug: "jisoo-flower",
  title: "FLOWER",
  artist: "artist/jisoo",
  performed: true,
} as const satisfies Song
