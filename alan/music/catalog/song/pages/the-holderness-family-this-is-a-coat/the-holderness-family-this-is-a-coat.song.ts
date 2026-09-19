import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const theHoldernessFamilyThisIsACoat = {
  id: "01a0b77e-fc52-7a87-bf57-d5d35ce832f9",
  type: "page-type/song",
  slug: "the-holderness-family-this-is-a-coat",
  title: "This Is A Coat",
  artist: "artist/the-holderness-family",
  performed: true,
} as const satisfies Song
