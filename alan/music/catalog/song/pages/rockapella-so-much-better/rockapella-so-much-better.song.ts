import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaSoMuchBetter = {
  id: "01a0d52b-52d9-7159-b1a5-97fcff33181c",
  type: "page-type/song",
  slug: "rockapella-so-much-better",
  title: "So Much Better",
  artist: "artist/rockapella",
  performed: true,
  createdAt: "2026-09-24T20:46:21.401Z",
  updatedAt: "2026-09-24T20:46:23.000Z",
} as const satisfies Song
