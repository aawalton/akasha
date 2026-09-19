import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanTheCoastOfGalicia = {
  id: "01a0b771-7fdc-79e2-9dba-99b3d882eedc",
  type: "page-type/song",
  slug: "celtic-woman-the-coast-of-galicia",
  title: "The Coast of Galiçia",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
