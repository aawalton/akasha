import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekHouseCarpenter = {
  id: "01a0caa8-b95d-7f03-8f40-b3ba63ceed73",
  type: "page-type/song",
  slug: "nickel-creek-house-carpenter",
  title: "House Carpenter",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
