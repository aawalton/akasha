import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaShapeOfYou = {
  id: "01a0d52b-52d9-7286-967b-4dbe11085cb6",
  type: "page-type/song",
  slug: "rockapella-shape-of-you",
  title: "Shape of You",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
