import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorMontana = {
  id: "01a0b779-59e7-76e5-bdfb-fb592beec7c5",
  type: "page-type/song",
  slug: "james-taylor-montana",
  title: "Montana",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
