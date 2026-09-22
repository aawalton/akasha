import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const reneeRappStupidWithLove = {
  id: "01a0caa9-014b-7e55-8cf7-1558ff8d827f",
  type: "page-type/song",
  slug: "renee-rapp-stupid-with-love",
  title: "Stupid With Love",
  artist: "artist/renee-rapp",
  performed: true,
} as const satisfies Song
