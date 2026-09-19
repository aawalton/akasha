import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallChasingCrowns = {
  id: "01a0b77d-16b4-747f-a84d-86e1943cef7c",
  type: "page-type/song",
  slug: "paul-cardall-chasing-crowns",
  title: "Chasing Crowns",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
