import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekTheMeadow = {
  id: "01a0caa8-a6c0-7207-8d18-81bc3c3faf2d",
  type: "page-type/song",
  slug: "nickel-creek-the-meadow",
  title: "The Meadow",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
