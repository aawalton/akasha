import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsCurse = {
  id: "01a0c43f-e7b7-71c0-bbe3-607d0005a244",
  type: "page-type/song",
  slug: "imagine-dragons-curse",
  title: "Curse",
  artist: "artist/imagine-dragons",
  performed: true,
} as const satisfies Song
