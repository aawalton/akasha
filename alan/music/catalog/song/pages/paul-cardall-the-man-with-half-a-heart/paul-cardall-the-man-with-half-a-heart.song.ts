import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTheManWithHalfAHeart = {
  id: "01a0b77e-b7fa-7895-b95b-189b9e808a26",
  type: "page-type/song",
  slug: "paul-cardall-the-man-with-half-a-heart",
  title: "The Man with Half a Heart",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
