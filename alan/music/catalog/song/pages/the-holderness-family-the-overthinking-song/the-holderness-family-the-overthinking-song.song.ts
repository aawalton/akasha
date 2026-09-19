import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const theHoldernessFamilyTheOverthinkingSong = {
  id: "01a0b77e-f9a7-7525-81d8-dcd408b9e9ec",
  type: "page-type/song",
  slug: "the-holderness-family-the-overthinking-song",
  title: "The Overthinking Song",
  artist: "artist/the-holderness-family",
  performed: true,
} as const satisfies Song
