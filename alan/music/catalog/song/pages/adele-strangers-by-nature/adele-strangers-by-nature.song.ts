import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleStrangersByNature = {
  id: "01a0d52b-c259-72c5-90da-f0f4fa913238",
  type: "page-type/song",
  slug: "adele-strangers-by-nature",
  title: "Strangers By Nature",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
