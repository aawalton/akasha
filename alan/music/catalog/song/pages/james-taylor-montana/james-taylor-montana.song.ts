import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorMontana = {
  id: "01a0b779-59e7-76e5-bdfb-fb592beec7c5",
  type: "page-type/song",
  slug: "james-taylor-montana",
  title: "Montana",
  artist: "artist/james-taylor",
  performed: true,
  createdAt: "2026-09-19T02:22:58.535Z",
  updatedAt: "2026-09-19T02:26:42.000Z",
} as const satisfies Song
