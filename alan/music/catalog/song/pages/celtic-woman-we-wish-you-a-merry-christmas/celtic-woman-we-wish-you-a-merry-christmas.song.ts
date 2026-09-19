import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanWeWishYouAMerryChristmas = {
  id: "01a0b771-a3fe-7afc-bcb9-2fa981aa24c4",
  type: "page-type/song",
  slug: "celtic-woman-we-wish-you-a-merry-christmas",
  title: "We Wish You A Merry Christmas",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
