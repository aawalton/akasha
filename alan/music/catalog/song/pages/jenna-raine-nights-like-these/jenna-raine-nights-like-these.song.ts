import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jennaRaineNightsLikeThese = {
  id: "01a0c621-1f08-7c51-ac72-206c99676437",
  type: "page-type/song",
  slug: "jenna-raine-nights-like-these",
  title: "Nights Like These",
  artist: "artist/jenna-raine",
  performed: true,
} as const satisfies Song
