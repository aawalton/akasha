import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTheMemoryLivesOn = {
  id: "01a0b77d-d5b8-7276-8ec0-6f823e819def",
  type: "page-type/song",
  slug: "paul-cardall-the-memory-lives-on",
  title: "The Memory Lives On",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
