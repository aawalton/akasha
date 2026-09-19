import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanDulaman20thAnniversary = {
  id: "01a0b771-2353-7580-b06b-5561bd51b7de",
  type: "page-type/song",
  slug: "celtic-woman-dulaman-20th-anniversary",
  title: "Dúlamán - 20th Anniversary",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
