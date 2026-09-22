import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekGoddamnedSaint = {
  id: "01a0caa8-a80f-707c-af8d-059a77fa5875",
  type: "page-type/song",
  slug: "nickel-creek-goddamned-saint",
  title: "Goddamned Saint",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
