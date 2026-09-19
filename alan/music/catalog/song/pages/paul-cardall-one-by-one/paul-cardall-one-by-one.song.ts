import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallOneByOne = {
  id: "01a0b77a-0054-7a27-a093-51d5456a1991",
  type: "page-type/song",
  slug: "paul-cardall-one-by-one",
  title: "One by One",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
