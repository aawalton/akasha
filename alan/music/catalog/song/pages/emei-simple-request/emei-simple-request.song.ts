import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiSimpleRequest = {
  id: "01a0c43e-7103-78d5-971b-c96ee3f164e9",
  type: "page-type/song",
  slug: "emei-simple-request",
  title: "Simple Request",
  artist: "artist/emei",
  performed: true,
  createdAt: "2026-09-21T13:53:41.635Z",
  updatedAt: "2026-09-21T13:53:47.000Z",
} as const satisfies Song
