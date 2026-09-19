import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanAwakening = {
  id: "01a0b771-5fbe-7796-862e-3a022293868a",
  type: "page-type/song",
  slug: "celtic-woman-awakening",
  title: "Awakening",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
