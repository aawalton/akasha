import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaItsASmallWorld = {
  id: "01a0d52b-52d9-7e45-9b85-7fd07258c0e5",
  type: "page-type/song",
  slug: "rockapella-its-a-small-world",
  title: "It's a Small World",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
