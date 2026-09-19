import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallStandstill = {
  id: "01a0b77d-4f8b-75f0-98df-7bff376d5e86",
  type: "page-type/song",
  slug: "paul-cardall-standstill",
  title: "Standstill",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
