import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleSkyfall = {
  id: "01a0d52b-c259-72d9-8a70-ece2487dbd1d",
  type: "page-type/song",
  slug: "adele-skyfall",
  title: "Skyfall",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
