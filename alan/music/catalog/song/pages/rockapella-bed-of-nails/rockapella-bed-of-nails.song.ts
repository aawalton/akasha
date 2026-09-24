import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaBedOfNails = {
  id: "01a0d52b-52d7-7117-af6c-531518036a55",
  type: "page-type/song",
  slug: "rockapella-bed-of-nails",
  title: "Bed of Nails",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
