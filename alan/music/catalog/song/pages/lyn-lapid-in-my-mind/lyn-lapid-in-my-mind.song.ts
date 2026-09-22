import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lynLapidInMyMind = {
  id: "01a0c95e-c0d0-70b4-86c2-1e39b6006d8e",
  type: "page-type/song",
  slug: "lyn-lapid-in-my-mind",
  title: "In My Mind",
  artist: "artist/lyn-lapid",
  performed: true,
} as const satisfies Song
