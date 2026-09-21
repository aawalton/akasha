import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsMayday = {
  id: "01a0c43f-b3ae-7f9e-858f-607992a465ca",
  type: "page-type/song",
  slug: "imagine-dragons-mayday",
  title: "Mayday",
  artist: "artist/imagine-dragons",
  performed: true,
} as const satisfies Song
