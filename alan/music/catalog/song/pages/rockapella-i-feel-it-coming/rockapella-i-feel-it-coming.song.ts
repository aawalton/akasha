import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaIFeelItComing = {
  id: "01a0d52b-52d8-7df7-b677-41c44e9e0813",
  type: "page-type/song",
  slug: "rockapella-i-feel-it-coming",
  title: "I Feel It Coming",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
