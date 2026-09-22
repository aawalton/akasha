import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekAnthony = {
  id: "01a0caa8-ae7a-7815-8a2f-ebb4ee7fb804",
  type: "page-type/song",
  slug: "nickel-creek-anthony",
  title: "Anthony",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
