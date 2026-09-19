import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const theHoldernessFamilyComplicated = {
  id: "01a0b77f-a858-7d8c-943f-0fb27536b50e",
  type: "page-type/song",
  slug: "the-holderness-family-complicated",
  title: "Complicated",
  artist: "artist/the-holderness-family",
  performed: true,
} as const satisfies Song
