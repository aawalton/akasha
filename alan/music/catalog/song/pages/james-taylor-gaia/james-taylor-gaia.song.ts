import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorGaia = {
  id: "01a0b779-67ba-7251-bedc-38e476816a49",
  type: "page-type/song",
  slug: "james-taylor-gaia",
  title: "Gaia",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
