import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanCarrickfergus = {
  id: "01a0b771-3f1b-735d-bdb9-c101c7d83c8d",
  type: "page-type/song",
  slug: "celtic-woman-carrickfergus",
  title: "Carrickfergus",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
