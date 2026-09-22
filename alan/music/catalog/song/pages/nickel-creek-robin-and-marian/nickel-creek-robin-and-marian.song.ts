import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekRobinAndMarian = {
  id: "01a0caa8-bc64-7465-8639-a4228e025943",
  type: "page-type/song",
  slug: "nickel-creek-robin-and-marian",
  title: "Robin And Marian",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
