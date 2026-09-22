import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekGreenAndGray = {
  id: "01a0caa8-b8d3-75fc-a566-264a6e09a6cf",
  type: "page-type/song",
  slug: "nickel-creek-green-and-gray",
  title: "Green And Gray",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
