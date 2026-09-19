import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallAveMaria = {
  id: "01a0b779-d2e4-769d-b2c7-d85ef91ea00d",
  type: "page-type/song",
  slug: "paul-cardall-ave-maria",
  title: "Ave Maria",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
