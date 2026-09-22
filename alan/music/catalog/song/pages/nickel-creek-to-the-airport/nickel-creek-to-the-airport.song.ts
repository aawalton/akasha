import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekToTheAirport = {
  id: "01a0caa8-a8fc-764f-9f4e-ac46e5d70a72",
  type: "page-type/song",
  slug: "nickel-creek-to-the-airport",
  title: "To the Airport",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
