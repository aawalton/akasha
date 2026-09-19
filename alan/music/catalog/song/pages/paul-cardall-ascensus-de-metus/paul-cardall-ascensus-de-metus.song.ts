import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallAscensusDeMetus = {
  id: "01a0b77d-12e4-7077-b4ed-45e873889c22",
  type: "page-type/song",
  slug: "paul-cardall-ascensus-de-metus",
  title: "Ascensus de Metus",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
