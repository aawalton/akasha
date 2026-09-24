import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaWonderfulChristmastime = {
  id: "01a0d52b-52da-7793-93a6-2f0235e8c975",
  type: "page-type/song",
  slug: "rockapella-wonderful-christmastime",
  title: "Wonderful Christmastime",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
