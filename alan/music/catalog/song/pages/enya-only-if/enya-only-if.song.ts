import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const enyaOnlyIf = {
  id: "01a14a1d-db43-73c3-be67-9bb4ec932977",
  type: "page-type/song",
  slug: "enya-only-if",
  title: "Only If",
  artist: "artist/enya",
  performed: true,
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T13:47:13.085Z",
} as const satisfies Song
