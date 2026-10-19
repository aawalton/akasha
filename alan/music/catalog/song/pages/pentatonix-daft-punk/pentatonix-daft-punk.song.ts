import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixDaftPunk = {
  id: "01a1546f-24ec-7286-a34b-fcfa945b5d4b",
  type: "page-type/song",
  slug: "pentatonix-daft-punk",
  title: "Daft Punk",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
