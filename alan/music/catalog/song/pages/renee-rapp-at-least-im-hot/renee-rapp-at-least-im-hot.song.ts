import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const reneeRappAtLeastImHot = {
  id: "01a0caa8-ff67-736e-92ba-59461d940d1d",
  type: "page-type/song",
  slug: "renee-rapp-at-least-im-hot",
  title: "At Least I’m Hot",
  artist: "artist/renee-rapp",
  performed: true,
} as const satisfies Song
