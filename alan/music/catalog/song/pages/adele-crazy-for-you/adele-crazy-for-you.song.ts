import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleCrazyForYou = {
  id: "01a0d52b-c259-784c-96bf-927551551bed",
  type: "page-type/song",
  slug: "adele-crazy-for-you",
  title: "Crazy For You",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
