import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiYouAreBad = {
  id: "01a0c43e-74ab-74f4-bdf1-eecee39948bb",
  type: "page-type/song",
  slug: "emei-you-are-bad",
  title: "You Are Bad",
  artist: "artist/emei",
  performed: true,
} as const satisfies Song
