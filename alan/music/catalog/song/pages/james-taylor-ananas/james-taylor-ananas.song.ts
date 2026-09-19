import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorAnanas = {
  id: "01a0b779-6536-7d7a-b92d-41ece0310af6",
  type: "page-type/song",
  slug: "james-taylor-ananas",
  title: "Ananas",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
