import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraSofia = {
  id: "01a0b770-d37b-76f4-a636-e1a4b272dcd2",
  type: "page-type/song",
  slug: "aurora-sofia",
  title: "Sofia",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
