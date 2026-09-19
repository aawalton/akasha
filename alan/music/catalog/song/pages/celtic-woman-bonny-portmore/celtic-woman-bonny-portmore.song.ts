import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanBonnyPortmore = {
  id: "01a0b779-290d-75f7-999a-368ae28fbc64",
  type: "page-type/song",
  slug: "celtic-woman-bonny-portmore",
  title: "Bonny Portmore",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
