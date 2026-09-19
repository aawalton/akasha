import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraTheFlood = {
  id: "01a0b770-dda2-79a3-80b6-f4676982f2ce",
  type: "page-type/song",
  slug: "aurora-the-flood",
  title: "The Flood",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
