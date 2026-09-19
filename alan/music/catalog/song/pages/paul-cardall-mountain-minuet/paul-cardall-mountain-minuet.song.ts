import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallMountainMinuet = {
  id: "01a0b77d-8209-7e4e-af26-391dbd113f0f",
  type: "page-type/song",
  slug: "paul-cardall-mountain-minuet",
  title: "Mountain Minuet",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
