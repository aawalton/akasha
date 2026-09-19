import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallLoveOneAnother = {
  id: "01a0b77d-1e0a-7fe6-8ad5-b18324f6f4d5",
  type: "page-type/song",
  slug: "paul-cardall-love-one-another",
  title: "Love One Another",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
