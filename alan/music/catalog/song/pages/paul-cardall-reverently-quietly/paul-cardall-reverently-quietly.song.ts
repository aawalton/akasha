import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallReverentlyQuietly = {
  id: "01a0b77e-6f7c-7db3-a19d-1ec920f05894",
  type: "page-type/song",
  slug: "paul-cardall-reverently-quietly",
  title: "Reverently Quietly",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
