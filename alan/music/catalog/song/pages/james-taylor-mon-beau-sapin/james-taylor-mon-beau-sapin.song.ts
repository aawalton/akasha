import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorMonBeauSapin = {
  id: "01a0b779-898b-7395-8325-4904c523fa3b",
  type: "page-type/song",
  slug: "james-taylor-mon-beau-sapin",
  title: "Mon Beau Sapin",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
