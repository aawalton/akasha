import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleRollingInTheDeep = {
  id: "01a0d52b-c259-766a-ae68-0449dc0b0449",
  type: "page-type/song",
  slug: "adele-rolling-in-the-deep",
  title: "Rolling in the Deep",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
