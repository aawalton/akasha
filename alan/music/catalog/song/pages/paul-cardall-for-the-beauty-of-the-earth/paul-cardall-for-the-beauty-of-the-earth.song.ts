import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallForTheBeautyOfTheEarth = {
  id: "01a0b779-a6af-7dfa-936e-97f1e6825e01",
  type: "page-type/song",
  slug: "paul-cardall-for-the-beauty-of-the-earth",
  title: "For the Beauty of the Earth",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
