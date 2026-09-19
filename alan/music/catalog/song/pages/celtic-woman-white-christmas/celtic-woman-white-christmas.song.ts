import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanWhiteChristmas = {
  id: "01a0b771-3dfc-7c25-8a09-82f191fde97e",
  type: "page-type/song",
  slug: "celtic-woman-white-christmas",
  title: "White Christmas",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
