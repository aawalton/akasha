import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekHoldingPattern = {
  id: "01a0caa8-a791-761d-beea-7316fb076c40",
  type: "page-type/song",
  slug: "nickel-creek-holding-pattern",
  title: "Holding Pattern",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
