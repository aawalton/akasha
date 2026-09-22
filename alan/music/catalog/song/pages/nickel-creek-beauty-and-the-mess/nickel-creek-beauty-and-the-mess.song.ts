import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekBeautyAndTheMess = {
  id: "01a0caa8-b9a3-7a32-af1c-52a9ac97bb99",
  type: "page-type/song",
  slug: "nickel-creek-beauty-and-the-mess",
  title: "Beauty And The Mess",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
