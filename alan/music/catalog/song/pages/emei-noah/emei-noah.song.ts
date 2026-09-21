import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiNoah = {
  id: "01a0c43e-706f-7d06-81e4-569c991d627c",
  type: "page-type/song",
  slug: "emei-noah",
  title: "Noah",
  artist: "artist/emei",
  performed: true,
} as const satisfies Song
