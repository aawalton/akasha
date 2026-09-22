import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekNewBlood = {
  id: "01a0caa8-a9cf-7255-88aa-54d18abe8ff3",
  type: "page-type/song",
  slug: "nickel-creek-new-blood",
  title: "New Blood",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
