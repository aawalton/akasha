import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanSailing = {
  id: "01a0b771-6354-76a9-96a9-cb84e3420a88",
  type: "page-type/song",
  slug: "celtic-woman-sailing",
  title: "Sailing",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
