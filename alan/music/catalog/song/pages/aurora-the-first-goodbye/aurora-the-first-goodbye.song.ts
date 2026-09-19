import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraTheFirstGoodbye = {
  id: "01a0b770-e547-7c5c-a006-f7f7a3e4a0b2",
  type: "page-type/song",
  slug: "aurora-the-first-goodbye",
  title: "The First Goodbye",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
