import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiGingerTea = {
  id: "01a0c43e-7658-72c1-875e-2d45b3d5e565",
  type: "page-type/song",
  slug: "emei-ginger-tea",
  title: "Ginger Tea",
  artist: "artist/emei",
  performed: true,
} as const satisfies Song
