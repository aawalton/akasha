import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiDistracted = {
  id: "01a0c43e-7e6a-77a4-8470-b06dfcfc2ec3",
  type: "page-type/song",
  slug: "emei-distracted",
  title: "Distracted",
  artist: "artist/emei",
  performed: true,
} as const satisfies Song
