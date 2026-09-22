import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekTheFox = {
  id: "01a0caa8-af8f-7fd5-8728-815bb03e2ba5",
  type: "page-type/song",
  slug: "nickel-creek-the-fox",
  title: "The Fox",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
