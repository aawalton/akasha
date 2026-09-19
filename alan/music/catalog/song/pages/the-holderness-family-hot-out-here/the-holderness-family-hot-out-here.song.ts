import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const theHoldernessFamilyHotOutHere = {
  id: "01a0b77f-aaba-7ec9-9ac3-0c4c0b4ecdfe",
  type: "page-type/song",
  slug: "the-holderness-family-hot-out-here",
  title: "Hot Out Here",
  artist: "artist/the-holderness-family",
  performed: true,
} as const satisfies Song
