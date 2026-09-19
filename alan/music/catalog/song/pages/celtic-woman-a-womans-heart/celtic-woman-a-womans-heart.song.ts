import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanAWomansHeart = {
  id: "01a0b771-5e17-7557-b270-529ee1a7dbe8",
  type: "page-type/song",
  slug: "celtic-woman-a-womans-heart",
  title: "A Woman's Heart",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
