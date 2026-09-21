import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiCynical = {
  id: "01a0c43e-73d3-7c75-b937-13e98022c832",
  type: "page-type/song",
  slug: "emei-cynical",
  title: "Cynical",
  artist: "artist/emei",
  performed: true,
} as const satisfies Song
