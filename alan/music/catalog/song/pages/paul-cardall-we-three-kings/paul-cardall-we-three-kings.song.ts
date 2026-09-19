import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallWeThreeKings = {
  id: "01a0b77d-43cd-787b-930b-98f6d3588684",
  type: "page-type/song",
  slug: "paul-cardall-we-three-kings",
  title: "We Three Kings",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
