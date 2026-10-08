import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekSevenWonders = {
  id: "01a0caa8-b918-7351-85a0-af472c29210b",
  type: "page-type/song",
  slug: "nickel-creek-seven-wonders",
  title: "Seven Wonders",
  artist: "artist/nickel-creek",
  performed: true,
  createdAt: "2026-09-22T19:47:30.200Z",
  updatedAt: "2026-09-22T19:47:33.000Z",
} as const satisfies Song
