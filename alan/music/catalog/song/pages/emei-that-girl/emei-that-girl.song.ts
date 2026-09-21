import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiThatGirl = {
  id: "01a0c43e-7d11-75a4-b715-0a257c2db843",
  type: "page-type/song",
  slug: "emei-that-girl",
  title: "That Girl",
  artist: "artist/emei",
  performed: true,
} as const satisfies Song
