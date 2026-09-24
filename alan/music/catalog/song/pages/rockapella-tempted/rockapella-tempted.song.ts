import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaTempted = {
  id: "01a0d52b-52da-7193-bd37-3a0e0c5e486b",
  type: "page-type/song",
  slug: "rockapella-tempted",
  title: "Tempted",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
