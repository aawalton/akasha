import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekThisSide = {
  id: "01a0caa8-ab31-77e3-962c-f30965e48508",
  type: "page-type/song",
  slug: "nickel-creek-this-side",
  title: "This Side",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
