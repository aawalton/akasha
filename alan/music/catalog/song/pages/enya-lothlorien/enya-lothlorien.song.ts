import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const enyaLothlorien = {
  id: "01a14a1d-db42-73cb-bce2-c5bdbaee5400",
  type: "page-type/song",
  slug: "enya-lothlorien",
  title: "Lothlórien",
  artist: "artist/enya",
  performed: true,
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T13:47:13.085Z",
} as const satisfies Song
