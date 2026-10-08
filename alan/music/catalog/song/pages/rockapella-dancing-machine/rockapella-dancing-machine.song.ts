import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaDancingMachine = {
  id: "01a0d52b-52d8-73c3-b857-ddb571bf3767",
  type: "page-type/song",
  slug: "rockapella-dancing-machine",
  title: "Dancing Machine",
  artist: "artist/rockapella",
  performed: true,
  createdAt: "2026-09-24T20:46:21.400Z",
  updatedAt: "2026-09-24T20:46:23.000Z",
} as const satisfies Song
