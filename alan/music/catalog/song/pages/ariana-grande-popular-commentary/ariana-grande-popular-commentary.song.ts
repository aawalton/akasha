import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandePopularCommentary = {
  id: "01a0b770-29ab-79a2-8b74-d9999484eb0d",
  type: "page-type/song",
  slug: "ariana-grande-popular-commentary",
  title: "Popular - Commentary",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
