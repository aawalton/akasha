import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaBang = {
  id: "01a0d52b-52d7-7668-8ada-23c1161f2b55",
  type: "page-type/song",
  slug: "rockapella-bang",
  title: "Bang",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
