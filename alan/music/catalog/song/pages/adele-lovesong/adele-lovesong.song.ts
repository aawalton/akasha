import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleLovesong = {
  id: "01a0d52b-c259-71e6-857e-007080fcf29e",
  type: "page-type/song",
  slug: "adele-lovesong",
  title: "Lovesong",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
