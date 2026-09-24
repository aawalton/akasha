import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaAPunk = {
  id: "01a0d52b-52d7-76f3-a1ec-d38f4f6f4e65",
  type: "page-type/song",
  slug: "rockapella-a-punk",
  title: "A-Punk",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
