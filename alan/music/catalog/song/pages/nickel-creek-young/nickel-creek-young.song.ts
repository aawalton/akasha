import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekYoung = {
  id: "01a0caa8-ba32-7b44-a094-40711d40776f",
  type: "page-type/song",
  slug: "nickel-creek-young",
  title: "Young",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
