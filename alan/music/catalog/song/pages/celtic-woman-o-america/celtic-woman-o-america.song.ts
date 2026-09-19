import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanOAmerica = {
  id: "01a0b771-7bc9-740e-b397-6f0ca79e9f96",
  type: "page-type/song",
  slug: "celtic-woman-o-america",
  title: "O, America!",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
