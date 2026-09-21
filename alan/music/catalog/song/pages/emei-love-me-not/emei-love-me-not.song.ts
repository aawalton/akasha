import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiLoveMeNot = {
  id: "01a0c43e-7a55-7b4e-ba01-2bdf2cab39aa",
  type: "page-type/song",
  slug: "emei-love-me-not",
  title: "Love Me Not",
  artist: "artist/emei",
  performed: true,
} as const satisfies Song
