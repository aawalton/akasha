import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaIAmYourMan = {
  id: "01a0d52b-52d8-7289-908f-49832aa36854",
  type: "page-type/song",
  slug: "rockapella-i-am-your-man",
  title: "I Am Your Man",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
