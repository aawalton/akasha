import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekOdeToAButterfly = {
  id: "01a0caa8-ad56-72b6-b415-239be41ab598",
  type: "page-type/song",
  slug: "nickel-creek-ode-to-a-butterfly",
  title: "Ode to a Butterfly",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
