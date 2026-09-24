import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaNoDoubtAtAll = {
  id: "01a0d52b-52d9-7c15-b880-020c26da780e",
  type: "page-type/song",
  slug: "rockapella-no-doubt-at-all",
  title: "No Doubt at All",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
