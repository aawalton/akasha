import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanFaithsSong = {
  id: "01a0b771-4b7d-799c-a09e-97ce863f2f4d",
  type: "page-type/song",
  slug: "celtic-woman-faiths-song",
  title: "Faith’s Song",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
