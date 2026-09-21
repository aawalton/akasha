import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiScatterbrain = {
  id: "01a0c43e-72c1-7c1c-bbfe-944756d89560",
  type: "page-type/song",
  slug: "emei-scatterbrain",
  title: "Scatterbrain",
  artist: "artist/emei",
  performed: true,
} as const satisfies Song
