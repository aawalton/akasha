import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayDayNNiteSpotifySingles = {
  id: "01a0ba65-5af0-7310-b7a0-bc207e03802f",
  type: "page-type/song",
  slug: "coldplay-day-n-nite-spotify-singles",
  title: "Day ‘n’ Nite - Spotify Singles",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
