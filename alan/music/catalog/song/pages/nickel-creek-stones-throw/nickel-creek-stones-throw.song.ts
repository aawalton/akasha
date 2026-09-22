import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekStonesThrow = {
  id: "01a0caa8-a84f-74be-8a36-76506a45c0bc",
  type: "page-type/song",
  slug: "nickel-creek-stones-throw",
  title: "Stone's Throw",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
