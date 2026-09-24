import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleMySame = {
  id: "01a0d52b-c259-7da9-ac77-1ea9d596b1a6",
  type: "page-type/song",
  slug: "adele-my-same",
  title: "My Same",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
