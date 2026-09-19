import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallStateOfMind = {
  id: "01a0b77d-3795-792c-8500-76ae5c03d3dd",
  type: "page-type/song",
  slug: "paul-cardall-state-of-mind",
  title: "State of Mind",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
