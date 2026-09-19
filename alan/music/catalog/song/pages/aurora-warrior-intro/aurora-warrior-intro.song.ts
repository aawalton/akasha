import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraWarriorIntro = {
  id: "01a0b770-d22e-72e6-a4c9-1274876492d7",
  type: "page-type/song",
  slug: "aurora-warrior-intro",
  title: "Warrior Intro",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
