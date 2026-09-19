import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraWolves = {
  id: "01a0b771-0921-71d2-a130-a8ce4afc7f37",
  type: "page-type/song",
  slug: "aurora-wolves",
  title: "Wolves",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
