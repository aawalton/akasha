import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiRegrets = {
  id: "01a0c43e-7cd5-7782-acc4-e7131f5429cb",
  type: "page-type/song",
  slug: "emei-regrets",
  title: "Regrets",
  artist: "artist/emei",
  performed: true,
} as const satisfies Song
