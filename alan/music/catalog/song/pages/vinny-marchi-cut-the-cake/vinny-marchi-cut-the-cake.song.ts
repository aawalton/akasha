import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiCutTheCake = {
  id: "01a0b783-c5e2-7326-80de-7c8f13919aa6",
  type: "page-type/song",
  slug: "vinny-marchi-cut-the-cake",
  title: "cut the cake",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
