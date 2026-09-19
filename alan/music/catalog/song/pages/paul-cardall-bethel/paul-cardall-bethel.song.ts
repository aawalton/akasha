import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallBethel = {
  id: "01a0b77d-a620-7a98-bc42-cfed92e219a9",
  type: "page-type/song",
  slug: "paul-cardall-bethel",
  title: "Bethel",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
