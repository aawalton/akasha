import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiSugarcoat = {
  id: "01a0c43e-7860-7876-a284-2781948432a1",
  type: "page-type/song",
  slug: "emei-sugarcoat",
  title: "SUGARCOAT",
  artist: "artist/emei",
  performed: true,
} as const satisfies Song
