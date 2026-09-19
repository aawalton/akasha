import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallSignOfAffection = {
  id: "01a0b77d-e3ad-7c0b-806a-c7fadc758057",
  type: "page-type/song",
  slug: "paul-cardall-sign-of-affection",
  title: "Sign of Affection",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
