import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanTheGalwayShawl = {
  id: "01a0b779-2cd9-7900-8d34-b4560151955a",
  type: "page-type/song",
  slug: "celtic-woman-the-galway-shawl",
  title: "The Galway Shawl",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
