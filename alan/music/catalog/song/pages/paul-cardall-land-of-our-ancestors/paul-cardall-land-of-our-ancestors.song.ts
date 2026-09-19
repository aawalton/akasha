import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallLandOfOurAncestors = {
  id: "01a0b77e-774b-7f6b-8885-47fe246cde3b",
  type: "page-type/song",
  slug: "paul-cardall-land-of-our-ancestors",
  title: "Land of Our Ancestors",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
