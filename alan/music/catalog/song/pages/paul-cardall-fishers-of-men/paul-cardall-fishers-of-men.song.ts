import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallFishersOfMen = {
  id: "01a0b779-a56c-792f-8b0e-102d061e9cb8",
  type: "page-type/song",
  slug: "paul-cardall-fishers-of-men",
  title: "Fishers of Men",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
