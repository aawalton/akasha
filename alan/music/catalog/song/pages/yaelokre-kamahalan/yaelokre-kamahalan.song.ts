import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const yaelokreKamahalan = {
  id: "01a0ce87-1268-7540-80e5-03cfcb2a57d7",
  type: "page-type/song",
  slug: "yaelokre-kamahalan",
  title: "Kamahalan",
  artist: "artist/yaelokre",
  performed: true,
} as const satisfies Song
