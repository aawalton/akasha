import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaThisChristmasDay = {
  id: "01a0d52b-52da-7794-9a39-335f9460efd4",
  type: "page-type/song",
  slug: "rockapella-this-christmas-day",
  title: "This Christmas Day",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
