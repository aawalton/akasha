import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const theHoldernessFamilyItWasntMe = {
  id: "01a0b77f-c92b-745a-a4ed-3bab653c2992",
  type: "page-type/song",
  slug: "the-holderness-family-it-wasnt-me",
  title: "It Wasn't Me",
  artist: "artist/the-holderness-family",
  performed: true,
} as const satisfies Song
