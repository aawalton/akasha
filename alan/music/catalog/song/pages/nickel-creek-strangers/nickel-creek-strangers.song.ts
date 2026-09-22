import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekStrangers = {
  id: "01a0caa8-a63d-712e-8b1b-e16c9e80b976",
  type: "page-type/song",
  slug: "nickel-creek-strangers",
  title: "Strangers",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
