import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lynLapidMySunnyDay = {
  id: "01a0c95e-c1a3-7d63-96c8-988e47068dad",
  type: "page-type/song",
  slug: "lyn-lapid-my-sunny-day",
  title: "My Sunny Day",
  artist: "artist/lyn-lapid",
  performed: true,
} as const satisfies Song
