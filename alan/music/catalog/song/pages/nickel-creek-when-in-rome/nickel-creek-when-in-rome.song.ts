import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekWhenInRome = {
  id: "01a0caa8-acca-7bde-b899-278b4e4c1d01",
  type: "page-type/song",
  slug: "nickel-creek-when-in-rome",
  title: "When in Rome",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
