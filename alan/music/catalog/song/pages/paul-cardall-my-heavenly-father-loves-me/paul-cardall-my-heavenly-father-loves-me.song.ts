import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallMyHeavenlyFatherLovesMe = {
  id: "01a0b77e-6bf3-743e-9a11-1cd20fe1dbd1",
  type: "page-type/song",
  slug: "paul-cardall-my-heavenly-father-loves-me",
  title: "My Heavenly Father Loves Me",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
