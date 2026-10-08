import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaTheMiddle = {
  id: "01a0d52b-52da-77c6-aa0a-f3f3481cb2b6",
  type: "page-type/song",
  slug: "rockapella-the-middle",
  title: "The Middle",
  artist: "artist/rockapella",
  performed: true,
  createdAt: "2026-09-24T20:46:21.402Z",
  updatedAt: "2026-09-24T20:46:23.000Z",
} as const satisfies Song
