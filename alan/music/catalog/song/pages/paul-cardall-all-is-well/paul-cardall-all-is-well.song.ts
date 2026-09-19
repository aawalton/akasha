import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallAllIsWell = {
  id: "01a0b77c-ec31-7e69-847f-72232cbf6982",
  type: "page-type/song",
  slug: "paul-cardall-all-is-well",
  title: "All Is Well",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
