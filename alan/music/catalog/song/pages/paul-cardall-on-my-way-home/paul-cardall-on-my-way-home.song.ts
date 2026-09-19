import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallOnMyWayHome = {
  id: "01a0b77e-59ca-795f-98bd-33fc4257893d",
  type: "page-type/song",
  slug: "paul-cardall-on-my-way-home",
  title: "On My Way Home",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
