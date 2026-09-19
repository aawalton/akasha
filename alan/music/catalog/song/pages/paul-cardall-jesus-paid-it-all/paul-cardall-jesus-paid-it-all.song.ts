import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallJesusPaidItAll = {
  id: "01a0b779-e53c-7b23-911a-4b59decccd68",
  type: "page-type/song",
  slug: "paul-cardall-jesus-paid-it-all",
  title: "Jesus Paid It All",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
