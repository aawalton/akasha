import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiLoveLikeThis = {
  id: "01a0b783-c970-7db6-a18a-06abcccd4d57",
  type: "page-type/song",
  slug: "vinny-marchi-love-like-this",
  title: "love like this",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
