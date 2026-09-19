import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const theHoldernessFamilyTheCharcuterieSong = {
  id: "01a0b77e-f855-745b-931e-2389bcdc8130",
  type: "page-type/song",
  slug: "the-holderness-family-the-charcuterie-song",
  title: "The Charcuterie Song",
  artist: "artist/the-holderness-family",
  performed: true,
} as const satisfies Song
