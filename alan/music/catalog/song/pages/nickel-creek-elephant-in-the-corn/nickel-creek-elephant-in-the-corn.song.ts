import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekElephantInTheCorn = {
  id: "01a0caa8-aec3-7d0d-83e0-caf6cb7c4c27",
  type: "page-type/song",
  slug: "nickel-creek-elephant-in-the-corn",
  title: "Elephant in the Corn",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
