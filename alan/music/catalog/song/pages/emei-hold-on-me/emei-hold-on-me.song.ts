import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiHoldOnMe = {
  id: "01a0c43e-7a96-7940-9b7c-68e41a5f5dda",
  type: "page-type/song",
  slug: "emei-hold-on-me",
  title: "Hold On Me",
  artist: "artist/emei",
  performed: true,
} as const satisfies Song
