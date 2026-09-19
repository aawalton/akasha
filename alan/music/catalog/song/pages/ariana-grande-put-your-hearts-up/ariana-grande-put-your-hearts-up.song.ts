import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandePutYourHeartsUp = {
  id: "01a0b76f-f7cd-7d5c-989a-ab4c6d49566f",
  type: "page-type/song",
  slug: "ariana-grande-put-your-hearts-up",
  title: "Put Your Hearts Up",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
