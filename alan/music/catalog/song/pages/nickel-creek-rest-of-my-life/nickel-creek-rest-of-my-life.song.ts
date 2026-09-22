import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekRestOfMyLife = {
  id: "01a0caa8-aaa3-7cc8-9fde-9ffeb32e602b",
  type: "page-type/song",
  slug: "nickel-creek-rest-of-my-life",
  title: "Rest of My Life",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
