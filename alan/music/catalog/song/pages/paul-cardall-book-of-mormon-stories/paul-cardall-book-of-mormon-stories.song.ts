import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallBookOfMormonStories = {
  id: "01a0b77e-66c3-7f5f-97fb-bafae92168d5",
  type: "page-type/song",
  slug: "paul-cardall-book-of-mormon-stories",
  title: "Book of Mormon Stories",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
