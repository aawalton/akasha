import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekSmoothieSong = {
  id: "01a0caa8-ac04-76fc-a799-47098eed7703",
  type: "page-type/song",
  slug: "nickel-creek-smoothie-song",
  title: "Smoothie Song",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
