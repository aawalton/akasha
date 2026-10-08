import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaMacklemore = {
  id: "01a0d52b-52d9-7700-811d-3c304d1dd62c",
  type: "page-type/song",
  slug: "rockapella-macklemore",
  title: "Macklemore",
  artist: "artist/rockapella",
  performed: true,
  createdAt: "2026-09-24T20:46:21.401Z",
  updatedAt: "2026-09-24T20:46:23.000Z",
} as const satisfies Song
