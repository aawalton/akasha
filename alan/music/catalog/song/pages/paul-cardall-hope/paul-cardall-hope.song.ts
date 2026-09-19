import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallHope = {
  id: "01a0b77d-0bc5-74e9-b7fd-fa21eb879056",
  type: "page-type/song",
  slug: "paul-cardall-hope",
  title: "Hope",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
