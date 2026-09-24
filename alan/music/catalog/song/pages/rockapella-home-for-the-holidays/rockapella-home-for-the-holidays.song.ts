import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaHomeForTheHolidays = {
  id: "01a0d52b-52d8-7025-be9d-d74093ba75bc",
  type: "page-type/song",
  slug: "rockapella-home-for-the-holidays",
  title: "Home for the Holidays",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
