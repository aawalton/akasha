import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekJealousOfTheMoon = {
  id: "01a0caa8-abbc-71b4-9816-9caa7f02d70a",
  type: "page-type/song",
  slug: "nickel-creek-jealous-of-the-moon",
  title: "Jealous of the Moon",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
