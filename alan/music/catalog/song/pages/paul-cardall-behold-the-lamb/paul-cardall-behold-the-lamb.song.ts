import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallBeholdTheLamb = {
  id: "01a0b779-f9f4-725b-96b3-44120bd24d77",
  type: "page-type/song",
  slug: "paul-cardall-behold-the-lamb",
  title: "Behold, The Lamb",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
