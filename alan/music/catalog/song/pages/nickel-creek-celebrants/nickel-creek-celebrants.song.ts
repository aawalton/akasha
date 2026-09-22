import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekCelebrants = {
  id: "01a0caa8-a5e5-78be-81c2-cc0bf62db053",
  type: "page-type/song",
  slug: "nickel-creek-celebrants",
  title: "Celebrants",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
