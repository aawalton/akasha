import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallABrokenHeart = {
  id: "01a0b779-f762-750d-ba05-7ed17e86feac",
  type: "page-type/song",
  slug: "paul-cardall-a-broken-heart",
  title: "A Broken Heart",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
