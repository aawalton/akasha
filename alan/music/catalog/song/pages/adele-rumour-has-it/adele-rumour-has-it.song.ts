import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleRumourHasIt = {
  id: "01a0d52b-c259-7fb3-b3a9-22c2294ef82d",
  type: "page-type/song",
  slug: "adele-rumour-has-it",
  title: "Rumour Has It",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
