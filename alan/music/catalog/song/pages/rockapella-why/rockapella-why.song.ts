import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaWhy = {
  id: "01a0d52b-52da-7916-ac7b-440ae8d655b8",
  type: "page-type/song",
  slug: "rockapella-why",
  title: "Why",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
