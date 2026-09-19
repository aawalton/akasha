import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanTheLastRoseOfSummer = {
  id: "01a0b771-43f4-7687-96e3-1b06397b7168",
  type: "page-type/song",
  slug: "celtic-woman-the-last-rose-of-summer",
  title: "The Last Rose Of Summer",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
