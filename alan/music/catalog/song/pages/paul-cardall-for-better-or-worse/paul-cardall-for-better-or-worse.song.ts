import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallForBetterOrWorse = {
  id: "01a0b77e-ae43-7700-ba52-fe7c9b54e973",
  type: "page-type/song",
  slug: "paul-cardall-for-better-or-worse",
  title: "For Better or Worse",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
