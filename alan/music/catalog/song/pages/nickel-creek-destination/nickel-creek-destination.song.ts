import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekDestination = {
  id: "01a0caa8-ab78-7572-a203-9539d770969a",
  type: "page-type/song",
  slug: "nickel-creek-destination",
  title: "Destination",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
