import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiDearEmily = {
  id: "01a0c43e-7343-7b3c-9acc-364575f64078",
  type: "page-type/song",
  slug: "emei-dear-emily",
  title: "Dear Emily",
  artist: "artist/emei",
  performed: true,
} as const satisfies Song
