import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emeiCrazyStupidLove = {
  id: "01a0c43e-773a-765c-ada4-68fadb2ec953",
  type: "page-type/song",
  slug: "emei-crazy-stupid-love",
  title: "Crazy Stupid Love",
  artist: "artist/emei",
  performed: true,
} as const satisfies Song
