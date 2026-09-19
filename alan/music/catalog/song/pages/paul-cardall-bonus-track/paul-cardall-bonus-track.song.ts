import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallBonusTrack = {
  id: "01a0b77e-6592-7fad-9c11-c27daca274cc",
  type: "page-type/song",
  slug: "paul-cardall-bonus-track",
  title: "Bonus Track",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
