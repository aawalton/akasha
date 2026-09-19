import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraAPotionForLove = {
  id: "01a0b770-30ec-766b-a96f-d7e89b1827e3",
  type: "page-type/song",
  slug: "aurora-a-potion-for-love",
  title: "A Potion For Love",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
