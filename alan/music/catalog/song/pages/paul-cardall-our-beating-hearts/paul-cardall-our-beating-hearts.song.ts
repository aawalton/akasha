import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallOurBeatingHearts = {
  id: "01a0b77d-650c-7157-9fdd-b54c8a06a28f",
  type: "page-type/song",
  slug: "paul-cardall-our-beating-hearts",
  title: "Our Beating Hearts",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
