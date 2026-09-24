import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaWinterWonderland = {
  id: "01a0d52b-52da-71d6-8f53-20e266fc9ea9",
  type: "page-type/song",
  slug: "rockapella-winter-wonderland",
  title: "Winter Wonderland",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
