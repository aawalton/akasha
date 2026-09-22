import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekCantComplain = {
  id: "01a0caa8-b374-70af-b0a5-c3709db3d94d",
  type: "page-type/song",
  slug: "nickel-creek-cant-complain",
  title: "Can’t Complain",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
