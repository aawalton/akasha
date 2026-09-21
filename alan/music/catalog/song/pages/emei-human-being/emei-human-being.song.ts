import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiHumanBeing = {
  id: "01a0c43e-74e7-7c18-a1df-a743a4651311",
  type: "page-type/song",
  slug: "emei-human-being",
  title: "Human Being",
  artist: "artist/emei",
  performed: true,
} as const satisfies Song
