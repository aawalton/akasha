import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioGone = {
  id: "01a0c622-242f-7cf6-9b00-51408ccf558f",
  type: "page-type/song",
  slug: "jessica-baio-gone",
  title: "gone",
  artist: "artist/jessica-baio",
  performed: true,
} as const satisfies Song
