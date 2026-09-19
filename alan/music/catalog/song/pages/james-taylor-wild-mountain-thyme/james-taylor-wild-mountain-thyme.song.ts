import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorWildMountainThyme = {
  id: "01a0b779-6007-7106-b482-265a9cf05826",
  type: "page-type/song",
  slug: "james-taylor-wild-mountain-thyme",
  title: "Wild Mountain Thyme",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
