import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaBlahBlahBlah = {
  id: "01a0d52b-52d7-7e03-84b3-98eff5ff69e9",
  type: "page-type/song",
  slug: "rockapella-blah-blah-blah",
  title: "Blah Blah Blah",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
