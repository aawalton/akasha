import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeMarchOfTheWitchHunters = {
  id: "01a0b770-0d8c-7d29-a3f5-64b4b6128660",
  type: "page-type/song",
  slug: "ariana-grande-march-of-the-witch-hunters",
  title: "March of the Witch Hunters",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
