import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiEndOfAnEra = {
  id: "01a0c43e-7d4f-74ec-a54d-f0881bf79d02",
  type: "page-type/song",
  slug: "emei-end-of-an-era",
  title: "End of an Era",
  artist: "artist/emei",
  performed: true,
} as const satisfies Song
