import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallMountainMeadows = {
  id: "01a0b77c-f50a-77f1-9231-010874fe0a53",
  type: "page-type/song",
  slug: "paul-cardall-mountain-meadows",
  title: "Mountain Meadows",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
