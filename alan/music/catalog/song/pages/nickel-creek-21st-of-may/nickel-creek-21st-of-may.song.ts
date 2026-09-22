import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreek21stOfMay = {
  id: "01a0caa8-ac8a-754e-bc6a-9fdb5be40454",
  type: "page-type/song",
  slug: "nickel-creek-21st-of-may",
  title: "21st of May",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
