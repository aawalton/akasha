import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallThanksgiving = {
  id: "01a0b77d-6bc1-75c4-a958-36d200f05db9",
  type: "page-type/song",
  slug: "paul-cardall-thanksgiving",
  title: "Thanksgiving",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
