import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekHayloft = {
  id: "01a0caa8-af4e-7cd7-8b07-2a6e692b2f20",
  type: "page-type/song",
  slug: "nickel-creek-hayloft",
  title: "Hayloft",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
