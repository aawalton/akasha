import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeKissMe = {
  id: "01a0b76f-eb85-74ff-919e-65f814c49c13",
  type: "page-type/song",
  slug: "ariana-grande-kiss-me",
  title: "kiss me",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
