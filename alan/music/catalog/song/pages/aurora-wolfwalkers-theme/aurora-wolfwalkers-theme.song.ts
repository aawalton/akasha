import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraWolfwalkersTheme = {
  id: "01a0b771-07d6-73b1-b593-ea688ea568e3",
  type: "page-type/song",
  slug: "aurora-wolfwalkers-theme",
  title: "WolfWalkers Theme",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
