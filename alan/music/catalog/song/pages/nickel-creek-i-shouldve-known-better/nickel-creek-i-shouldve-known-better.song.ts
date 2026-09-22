import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekIShouldveKnownBetter = {
  id: "01a0caa8-b3b4-7ba4-aece-b2c660faffda",
  type: "page-type/song",
  slug: "nickel-creek-i-shouldve-known-better",
  title: "I Should’ve Known Better",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
