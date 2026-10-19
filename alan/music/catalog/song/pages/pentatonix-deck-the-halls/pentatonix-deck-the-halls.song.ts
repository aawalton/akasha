import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixDeckTheHalls = {
  id: "01a1546f-24ec-75d9-af07-a83230b3a8c2",
  type: "page-type/song",
  slug: "pentatonix-deck-the-halls",
  title: "Deck The Halls",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
