import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallCarolOfTheBells = {
  id: "01a0b77a-0792-7cd2-9741-9a59f4e52d66",
  type: "page-type/song",
  slug: "paul-cardall-carol-of-the-bells",
  title: "Carol of the Bells",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
