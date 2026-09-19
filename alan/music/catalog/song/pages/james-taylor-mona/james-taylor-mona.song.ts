import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorMona = {
  id: "01a0b779-7dec-748f-aa7f-b85500ad238c",
  type: "page-type/song",
  slug: "james-taylor-mona",
  title: "Mona",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
