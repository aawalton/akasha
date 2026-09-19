import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallFatherInHeaven = {
  id: "01a0b779-a42c-7121-8ecc-564b47d67d71",
  type: "page-type/song",
  slug: "paul-cardall-father-in-heaven",
  title: "Father in Heaven",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
