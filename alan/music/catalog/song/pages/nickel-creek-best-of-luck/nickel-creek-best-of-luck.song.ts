import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekBestOfLuck = {
  id: "01a0caa8-b65f-7379-8259-de7457a33844",
  type: "page-type/song",
  slug: "nickel-creek-best-of-luck",
  title: "Best Of Luck",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
