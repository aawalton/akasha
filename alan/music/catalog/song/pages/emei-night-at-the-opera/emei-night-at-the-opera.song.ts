import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiNightAtTheOpera = {
  id: "01a0c43e-6fdd-75d9-8c7a-8ca88d85f5b3",
  type: "page-type/song",
  slug: "emei-night-at-the-opera",
  title: "Night at the Opera",
  artist: "artist/emei",
  performed: true,
} as const satisfies Song
