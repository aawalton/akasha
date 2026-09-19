import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallEden = {
  id: "01a0b77d-2f00-7df4-bf5b-31367866f489",
  type: "page-type/song",
  slug: "paul-cardall-eden",
  title: "Eden",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
