import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanHomeland = {
  id: "01a0b771-4f1f-74b3-80e3-55a1dbb7d30c",
  type: "page-type/song",
  slug: "celtic-woman-homeland",
  title: "Homeland",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
