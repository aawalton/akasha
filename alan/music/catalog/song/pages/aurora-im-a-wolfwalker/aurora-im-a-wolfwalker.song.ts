import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraImAWolfwalker = {
  id: "01a0b770-fb0f-7ac0-a950-88a13ba2c0be",
  type: "page-type/song",
  slug: "aurora-im-a-wolfwalker",
  title: "I'm a WolfWalker",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
