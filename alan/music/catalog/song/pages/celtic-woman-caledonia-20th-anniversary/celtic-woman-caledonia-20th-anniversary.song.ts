import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanCaledonia20thAnniversary = {
  id: "01a0b771-1f46-7061-ac10-172e28da2677",
  type: "page-type/song",
  slug: "celtic-woman-caledonia-20th-anniversary",
  title: "Caledonia - 20th Anniversary",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
