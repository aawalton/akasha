import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonSilentNight = {
  id: "01a0b783-eb22-733a-8d91-7ce719c5d052",
  type: "page-type/song",
  slug: "zara-larsson-silent-night",
  title: "Silent Night",
  artist: "artist/zara-larsson",
  performed: true,
} as const satisfies Song
