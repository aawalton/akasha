import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekSpitOnAStranger = {
  id: "01a0caa8-b7b1-713d-bab6-769c3733d03d",
  type: "page-type/song",
  slug: "nickel-creek-spit-on-a-stranger",
  title: "Spit On A Stranger",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
