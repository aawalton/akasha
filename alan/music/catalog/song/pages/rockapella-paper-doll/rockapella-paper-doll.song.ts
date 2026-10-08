import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaPaperDoll = {
  id: "01a0d52b-52d9-7eb3-989c-26d3afe6609c",
  type: "page-type/song",
  slug: "rockapella-paper-doll",
  title: "Paper Doll",
  artist: "artist/rockapella",
  performed: true,
  createdAt: "2026-09-24T20:46:21.401Z",
  updatedAt: "2026-09-24T20:46:23.000Z",
} as const satisfies Song
