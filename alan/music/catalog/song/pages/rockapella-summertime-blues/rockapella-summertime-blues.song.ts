import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaSummertimeBlues = {
  id: "01a0d52b-52da-74c4-965b-e886db3c16a5",
  type: "page-type/song",
  slug: "rockapella-summertime-blues",
  title: "Summertime Blues",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
