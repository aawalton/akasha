import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraTheSeedIntro = {
  id: "01a0b770-cfb7-75c3-ab6f-9394cd2d98d2",
  type: "page-type/song",
  slug: "aurora-the-seed-intro",
  title: "The Seed Intro",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
