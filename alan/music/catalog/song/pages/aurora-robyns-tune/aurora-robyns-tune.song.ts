import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraRobynsTune = {
  id: "01a0b771-033a-7ca6-b875-623bea9cf0a0",
  type: "page-type/song",
  slug: "aurora-robyns-tune",
  title: "Robyn's Tune",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
