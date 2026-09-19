import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTheSpiritOfGod = {
  id: "01a0b779-c6a4-7c8b-9b9c-d1bffde0a346",
  type: "page-type/song",
  slug: "paul-cardall-the-spirit-of-god",
  title: "The Spirit of God",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
