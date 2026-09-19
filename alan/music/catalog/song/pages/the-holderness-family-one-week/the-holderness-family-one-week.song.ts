import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const theHoldernessFamilyOneWeek = {
  id: "01a0b77f-e439-7c6d-b42d-e2ff513d5838",
  type: "page-type/song",
  slug: "the-holderness-family-one-week",
  title: "One Week",
  artist: "artist/the-holderness-family",
  performed: true,
} as const satisfies Song
