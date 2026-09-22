import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekFromTheBeach = {
  id: "01a0caa8-a8be-756e-b18a-afad68a1b935",
  type: "page-type/song",
  slug: "nickel-creek-from-the-beach",
  title: "From the Beach",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
