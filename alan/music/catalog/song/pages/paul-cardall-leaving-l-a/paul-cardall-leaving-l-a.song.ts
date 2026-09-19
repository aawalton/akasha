import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallLeavingLA = {
  id: "01a0b77d-cfea-7c11-b9ba-84e61c5f6bf7",
  type: "page-type/song",
  slug: "paul-cardall-leaving-l-a",
  title: "Leaving L.A.",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
