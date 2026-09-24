import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleCryYourHeartOut = {
  id: "01a0d52b-c259-77b3-abf3-0837aa52cc83",
  type: "page-type/song",
  slug: "adele-cry-your-heart-out",
  title: "Cry Your Heart Out",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
