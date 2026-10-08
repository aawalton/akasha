import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaImTheOne = {
  id: "01a0d52b-52d9-76da-bca0-c1ec173db8c1",
  type: "page-type/song",
  slug: "rockapella-im-the-one",
  title: "I'm the One",
  artist: "artist/rockapella",
  performed: true,
  createdAt: "2026-09-24T20:46:21.401Z",
  updatedAt: "2026-09-24T20:46:23.000Z",
} as const satisfies Song
