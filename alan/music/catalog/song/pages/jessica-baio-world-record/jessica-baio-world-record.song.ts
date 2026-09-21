import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioWorldRecord = {
  id: "01a0c622-2501-7475-a61e-4a7a0d8efd42",
  type: "page-type/song",
  slug: "jessica-baio-world-record",
  title: "world record",
  artist: "artist/jessica-baio",
  performed: true,
} as const satisfies Song
