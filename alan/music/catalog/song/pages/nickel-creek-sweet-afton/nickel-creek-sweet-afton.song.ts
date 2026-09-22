import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekSweetAfton = {
  id: "01a0caa8-bbbd-738d-92c8-57bb76146432",
  type: "page-type/song",
  slug: "nickel-creek-sweet-afton",
  title: "Sweet Afton",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
