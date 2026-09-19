import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeCommentary = {
  id: "01a0b770-064b-703d-808c-35a66a028d2d",
  type: "page-type/song",
  slug: "ariana-grande-commentary",
  title: "Commentary",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
