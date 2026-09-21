import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiThePart = {
  id: "01a0c43e-78a1-7313-b48b-3b9d5fcfdbc3",
  type: "page-type/song",
  slug: "emei-the-part",
  title: "THE PART",
  artist: "artist/emei",
  performed: true,
} as const satisfies Song
