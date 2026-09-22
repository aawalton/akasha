import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekFirstAndLastWaltz = {
  id: "01a0caa8-b6dd-799d-a0c5-1da4112e7860",
  type: "page-type/song",
  slug: "nickel-creek-first-and-last-waltz",
  title: "First And Last Waltz",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
