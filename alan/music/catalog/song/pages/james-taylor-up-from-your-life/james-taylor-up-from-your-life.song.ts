import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorUpFromYourLife = {
  id: "01a0b779-6ce7-7245-a85a-085ca61a8be2",
  type: "page-type/song",
  slug: "james-taylor-up-from-your-life",
  title: "Up From Your Life",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
