import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaSoMuchBetter = {
  id: "01a0d52b-52d9-7159-b1a5-97fcff33181c",
  type: "page-type/song",
  slug: "rockapella-so-much-better",
  title: "So Much Better",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
