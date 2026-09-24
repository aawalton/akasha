import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaThatsTheWay = {
  id: "01a0d52b-52da-7dbf-b8f9-eddd6006d4a8",
  type: "page-type/song",
  slug: "rockapella-thats-the-way",
  title: "That's the Way",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
