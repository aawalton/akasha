import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTheGreatAlexander = {
  id: "01a0b77d-2582-7ee0-85be-7f4efb447997",
  type: "page-type/song",
  slug: "paul-cardall-the-great-alexander",
  title: "The Great Alexander",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
