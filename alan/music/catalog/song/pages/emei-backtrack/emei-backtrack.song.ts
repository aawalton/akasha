import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiBacktrack = {
  id: "01a0c43e-7bc5-7c82-9523-a176b56f692e",
  type: "page-type/song",
  slug: "emei-backtrack",
  title: "Backtrack",
  artist: "artist/emei",
  performed: true,
} as const satisfies Song
