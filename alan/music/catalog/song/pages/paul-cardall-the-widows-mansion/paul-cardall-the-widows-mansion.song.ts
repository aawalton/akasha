import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTheWidowsMansion = {
  id: "01a0b77d-b1a0-7a81-9509-3733a7ee49a5",
  type: "page-type/song",
  slug: "paul-cardall-the-widows-mansion",
  title: "The Widow's Mansion",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
