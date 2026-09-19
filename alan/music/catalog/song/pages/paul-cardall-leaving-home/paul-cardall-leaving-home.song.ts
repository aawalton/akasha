import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallLeavingHome = {
  id: "01a0b77d-ea15-7948-a16e-b9f3d3685511",
  type: "page-type/song",
  slug: "paul-cardall-leaving-home",
  title: "Leaving Home",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
