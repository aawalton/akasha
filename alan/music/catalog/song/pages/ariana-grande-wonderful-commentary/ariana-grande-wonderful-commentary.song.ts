import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeWonderfulCommentary = {
  id: "01a0b770-1a96-76d4-a3a5-982290f3abc2",
  type: "page-type/song",
  slug: "ariana-grande-wonderful-commentary",
  title: "Wonderful - Commentary",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
