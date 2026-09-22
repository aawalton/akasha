import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekStumptown = {
  id: "01a0caa8-b5ee-7a47-9fea-f64ffff8c4c3",
  type: "page-type/song",
  slug: "nickel-creek-stumptown",
  title: "Stumptown",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
