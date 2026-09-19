import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallSomeKindOfWonderful = {
  id: "01a0b77e-b565-7cb1-ac02-51726aabb990",
  type: "page-type/song",
  slug: "paul-cardall-some-kind-of-wonderful",
  title: "Some Kind of Wonderful",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
