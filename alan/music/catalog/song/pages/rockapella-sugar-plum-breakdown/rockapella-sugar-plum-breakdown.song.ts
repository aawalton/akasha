import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaSugarPlumBreakdown = {
  id: "01a0d52b-52da-7ec5-95cf-5ac5fdd93b23",
  type: "page-type/song",
  slug: "rockapella-sugar-plum-breakdown",
  title: "Sugar Plum Breakdown",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
