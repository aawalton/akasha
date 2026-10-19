import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixTheLuckyOnes = {
  id: "01a1546f-24f1-753c-8986-8ed24d52a4c9",
  type: "page-type/song",
  slug: "pentatonix-the-lucky-ones",
  title: "The Lucky Ones",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
