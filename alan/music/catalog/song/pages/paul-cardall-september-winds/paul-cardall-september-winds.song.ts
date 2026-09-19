import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallSeptemberWinds = {
  id: "01a0b77d-67cb-7446-9ea0-d32d29e70a40",
  type: "page-type/song",
  slug: "paul-cardall-september-winds",
  title: "September Winds",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
