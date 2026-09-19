import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorUpErMei = {
  id: "01a0b779-6b89-7831-935b-5cb5b4c2e509",
  type: "page-type/song",
  slug: "james-taylor-up-er-mei",
  title: "Up Er Mei",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
