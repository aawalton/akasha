import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanAdesteFideles = {
  id: "01a0b771-9ccd-7dc5-8655-867094ade6ea",
  type: "page-type/song",
  slug: "celtic-woman-adeste-fideles",
  title: "Adeste Fideles",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
