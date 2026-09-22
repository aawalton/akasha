import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kDaTheBaddest = {
  id: "01a0c957-fde5-7b14-a4fb-947e9872702e",
  type: "page-type/song",
  slug: "k-da-the-baddest",
  title: "THE BADDEST",
  artist: "artist/k-da",
  performed: true,
} as const satisfies Song
