import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaLetItBe = {
  id: "01a0d52b-52d9-7b33-a7f5-9fe7937c4d3f",
  type: "page-type/song",
  slug: "rockapella-let-it-be",
  title: "Let It Be",
  artist: "artist/rockapella",
  performed: true,
  createdAt: "2026-09-24T20:46:21.401Z",
  updatedAt: "2026-09-24T20:46:23.000Z",
} as const satisfies Song
