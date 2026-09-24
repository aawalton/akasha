import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaSirGotalot = {
  id: "01a0d52b-52d9-7c89-b8c5-cf2f122b3810",
  type: "page-type/song",
  slug: "rockapella-sir-gotalot",
  title: "Sir GotALot",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
