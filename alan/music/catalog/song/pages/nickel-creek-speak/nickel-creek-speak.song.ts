import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekSpeak = {
  id: "01a0caa8-b7f5-7326-b2d5-019660ad0506",
  type: "page-type/song",
  slug: "nickel-creek-speak",
  title: "Speak",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
