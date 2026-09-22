import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekThinnestWall = {
  id: "01a0caa8-a705-71e2-bd68-95cdc9a5a1d6",
  type: "page-type/song",
  slug: "nickel-creek-thinnest-wall",
  title: "Thinnest Wall",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
