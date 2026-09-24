import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleTurningTables = {
  id: "01a0d52b-c259-7c43-9f58-9e9339e6c484",
  type: "page-type/song",
  slug: "adele-turning-tables",
  title: "Turning Tables",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
