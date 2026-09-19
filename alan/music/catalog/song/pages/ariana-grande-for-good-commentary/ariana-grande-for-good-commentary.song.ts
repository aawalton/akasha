import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeForGoodCommentary = {
  id: "01a0b770-09ef-7e46-85ef-31f2db414614",
  type: "page-type/song",
  slug: "ariana-grande-for-good-commentary",
  title: "For Good - Commentary",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
