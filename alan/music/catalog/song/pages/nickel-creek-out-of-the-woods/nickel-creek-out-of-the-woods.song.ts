import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekOutOfTheWoods = {
  id: "01a0caa8-b274-71fd-8ec7-57c6e9964d80",
  type: "page-type/song",
  slug: "nickel-creek-out-of-the-woods",
  title: "Out Of The Woods",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
