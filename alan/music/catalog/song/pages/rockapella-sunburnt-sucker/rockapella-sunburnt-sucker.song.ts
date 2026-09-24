import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaSunburntSucker = {
  id: "01a0d52b-52da-7ad6-a46c-4d05fadffcb3",
  type: "page-type/song",
  slug: "rockapella-sunburnt-sucker",
  title: "Sunburnt Sucker",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
