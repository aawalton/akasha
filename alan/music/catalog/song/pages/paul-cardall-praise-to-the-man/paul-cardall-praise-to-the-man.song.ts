import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallPraiseToTheMan = {
  id: "01a0b77d-97a2-7d44-a0e4-526017198365",
  type: "page-type/song",
  slug: "paul-cardall-praise-to-the-man",
  title: "Praise To The Man",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
