import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraWolfOrGirl = {
  id: "01a0b771-06ab-7cd5-9a8d-26d654f5316b",
  type: "page-type/song",
  slug: "aurora-wolf-or-girl",
  title: "Wolf or Girl",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
