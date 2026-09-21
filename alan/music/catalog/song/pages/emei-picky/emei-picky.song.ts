import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiPicky = {
  id: "01a0c43e-7385-7e0d-8ea7-1d0d44b53145",
  type: "page-type/song",
  slug: "emei-picky",
  title: "Picky",
  artist: "artist/emei",
  performed: true,
} as const satisfies Song
