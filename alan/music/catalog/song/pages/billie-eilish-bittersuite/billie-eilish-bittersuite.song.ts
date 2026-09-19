import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishBittersuite = {
  id: "01a0b771-12a1-72f1-8d82-cc72f7c8e7ab",
  type: "page-type/song",
  slug: "billie-eilish-bittersuite",
  title: "BITTERSUITE",
  artist: "artist/billie-eilish",
  performed: true,
} as const satisfies Song
