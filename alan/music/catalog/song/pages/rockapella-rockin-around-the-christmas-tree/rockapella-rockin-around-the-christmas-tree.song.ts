import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaRockinAroundTheChristmasTree = {
  id: "01a0d52b-52d9-76b5-b520-823b53ea4c66",
  type: "page-type/song",
  slug: "rockapella-rockin-around-the-christmas-tree",
  title: "Rockin' Around the Christmas Tree",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
