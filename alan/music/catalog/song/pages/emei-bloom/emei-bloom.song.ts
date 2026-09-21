import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiBloom = {
  id: "01a0c43e-70bc-7df8-a806-b849f891a546",
  type: "page-type/song",
  slug: "emei-bloom",
  title: "Bloom",
  artist: "artist/emei",
  performed: true,
} as const satisfies Song
