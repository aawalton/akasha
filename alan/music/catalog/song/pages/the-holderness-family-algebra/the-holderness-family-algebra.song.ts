import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const theHoldernessFamilyAlgebra = {
  id: "01a0b77f-b221-7562-ad4f-81eec5f273aa",
  type: "page-type/song",
  slug: "the-holderness-family-algebra",
  title: "Algebra",
  artist: "artist/the-holderness-family",
  performed: true,
} as const satisfies Song
