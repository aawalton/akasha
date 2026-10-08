import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleLovesong = {
  id: "01a0d52b-c259-71e6-857e-007080fcf29e",
  type: "page-type/song",
  slug: "adele-lovesong",
  title: "Lovesong",
  artist: "artist/adele",
  performed: true,
  createdAt: "2026-09-24T20:46:49.945Z",
  updatedAt: "2026-09-24T20:46:51.000Z",
} as const satisfies Song
