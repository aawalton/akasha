import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekDoubtingThomas = {
  id: "01a0caa8-b69c-727c-b4a6-8a17a83a38d4",
  type: "page-type/song",
  slug: "nickel-creek-doubting-thomas",
  title: "Doubting Thomas",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
