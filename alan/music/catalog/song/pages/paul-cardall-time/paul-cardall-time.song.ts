import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTime = {
  id: "01a0b77d-d706-7a1a-a6bf-ab7fee4445de",
  type: "page-type/song",
  slug: "paul-cardall-time",
  title: "Time",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
