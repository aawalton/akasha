import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorAngelsOfFenway = {
  id: "01a0b779-5624-7aa5-8044-72039675d7d7",
  type: "page-type/song",
  slug: "james-taylor-angels-of-fenway",
  title: "Angels Of Fenway",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
