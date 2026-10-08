import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaTonight = {
  id: "01a0d52b-52da-7f27-abe3-e9d5224ca32d",
  type: "page-type/song",
  slug: "rockapella-tonight",
  title: "Tonight",
  artist: "artist/rockapella",
  performed: true,
  createdAt: "2026-09-24T20:46:21.402Z",
  updatedAt: "2026-09-24T20:46:23.000Z",
} as const satisfies Song
