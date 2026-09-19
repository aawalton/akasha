import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const theHoldernessFamilyWashYourHands = {
  id: "01a0b77f-ea85-7090-8f73-775dd6e9301e",
  type: "page-type/song",
  slug: "the-holderness-family-wash-your-hands",
  title: "Wash Your Hands",
  artist: "artist/the-holderness-family",
  performed: true,
} as const satisfies Song
