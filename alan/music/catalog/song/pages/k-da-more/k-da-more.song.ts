import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kDaMore = {
  id: "01a0c957-fe44-707c-8c00-767c264bf5c7",
  type: "page-type/song",
  slug: "k-da-more",
  title: "MORE",
  artist: "artist/k-da",
  performed: true,
} as const satisfies Song
