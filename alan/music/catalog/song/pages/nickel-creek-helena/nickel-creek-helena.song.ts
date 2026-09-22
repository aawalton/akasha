import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekHelena = {
  id: "01a0caa8-afcd-73a4-b080-b7f2fc2c6512",
  type: "page-type/song",
  slug: "nickel-creek-helena",
  title: "Helena",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
