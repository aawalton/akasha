import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kDaPopStars = {
  id: "01a0c957-ffab-7ea8-9f45-181911039bb6",
  type: "page-type/song",
  slug: "k-da-pop-stars",
  title: "POP/STARS",
  artist: "artist/k-da",
  performed: true,
} as const satisfies Song
