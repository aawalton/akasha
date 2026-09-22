import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekLoveOfMine = {
  id: "01a0caa8-b197-76e2-b252-f74b31b58b7a",
  type: "page-type/song",
  slug: "nickel-creek-love-of-mine",
  title: "Love of Mine",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
