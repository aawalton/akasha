import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioHome = {
  id: "01a0c622-247b-7b30-8080-47c74c8438a5",
  type: "page-type/song",
  slug: "jessica-baio-home",
  title: "home",
  artist: "artist/jessica-baio",
  performed: true,
} as const satisfies Song
