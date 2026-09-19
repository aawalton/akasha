import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallWhatChildIsThis = {
  id: "01a0b77a-ab9d-7c9f-9c15-8e0f750f1118",
  type: "page-type/song",
  slug: "paul-cardall-what-child-is-this",
  title: "What Child Is This?",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
