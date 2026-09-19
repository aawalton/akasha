import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorOhSusannah = {
  id: "01a0b779-7a38-7adf-9e4a-2ad514ad6360",
  type: "page-type/song",
  slug: "james-taylor-oh-susannah",
  title: "Oh, Susannah",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
