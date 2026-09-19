import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTheFall = {
  id: "01a0b77a-02bf-7b9c-af86-ffb6b5e6a4c1",
  type: "page-type/song",
  slug: "paul-cardall-the-fall",
  title: "The Fall",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
