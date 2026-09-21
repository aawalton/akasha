import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiTrustIssues = {
  id: "01a0c43e-7c8f-7e5f-a534-80adbd33a356",
  type: "page-type/song",
  slug: "emei-trust-issues",
  title: "Trust Issues",
  artist: "artist/emei",
  performed: true,
} as const satisfies Song
