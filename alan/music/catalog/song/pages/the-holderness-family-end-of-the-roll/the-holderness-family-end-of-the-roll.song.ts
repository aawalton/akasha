import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const theHoldernessFamilyEndOfTheRoll = {
  id: "01a0b77f-dde5-7e23-af75-f9692b7f192c",
  type: "page-type/song",
  slug: "the-holderness-family-end-of-the-roll",
  title: "End of the Roll",
  artist: "artist/the-holderness-family",
  performed: true,
} as const satisfies Song
