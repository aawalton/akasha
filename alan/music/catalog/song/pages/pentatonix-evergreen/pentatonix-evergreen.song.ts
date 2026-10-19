import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixEvergreen = {
  id: "01a1546f-24ec-70b2-b8e4-f98fff9e671a",
  type: "page-type/song",
  slug: "pentatonix-evergreen",
  title: "Evergreen",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
