import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaHardTime = {
  id: "01a0d52b-52d8-7855-91ed-ccc9da6b9c67",
  type: "page-type/song",
  slug: "rockapella-hard-time",
  title: "Hard Time",
  artist: "artist/rockapella",
  performed: true,
  createdAt: "2026-09-24T20:46:21.400Z",
  updatedAt: "2026-09-24T20:46:23.000Z",
} as const satisfies Song
