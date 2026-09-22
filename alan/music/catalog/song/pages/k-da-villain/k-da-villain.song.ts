import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kDaVillain = {
  id: "01a0c957-fe8f-7bc4-9c51-131621656203",
  type: "page-type/song",
  slug: "k-da-villain",
  title: "VILLAIN",
  artist: "artist/k-da",
  performed: true,
} as const satisfies Song
