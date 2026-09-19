import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallThereIsAGreenHillFarAway = {
  id: "01a0b779-c7f2-7cb2-a04b-3d024d091292",
  type: "page-type/song",
  slug: "paul-cardall-there-is-a-green-hill-far-away",
  title: "There Is a Green Hill Far Away",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
