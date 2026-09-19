import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanGalwayBay = {
  id: "01a0b771-77a7-79d9-8974-9b56a5a26f85",
  type: "page-type/song",
  slug: "celtic-woman-galway-bay",
  title: "Galway Bay",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
