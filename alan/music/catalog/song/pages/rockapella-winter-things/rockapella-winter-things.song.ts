import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaWinterThings = {
  id: "01a0d52b-52da-7ec3-87a3-aaaea5972aff",
  type: "page-type/song",
  slug: "rockapella-winter-things",
  title: "Winter Things",
  artist: "artist/rockapella",
  performed: true,
  createdAt: "2026-09-24T20:46:21.402Z",
  updatedAt: "2026-09-24T20:46:23.000Z",
} as const satisfies Song
