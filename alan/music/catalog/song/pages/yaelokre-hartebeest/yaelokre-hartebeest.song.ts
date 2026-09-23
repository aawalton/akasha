import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const yaelokreHartebeest = {
  id: "01a0ce87-104d-7c10-8242-e689f4ebd00e",
  type: "page-type/song",
  slug: "yaelokre-hartebeest",
  title: "Hartebeest",
  artist: "artist/yaelokre",
  performed: true,
} as const satisfies Song
