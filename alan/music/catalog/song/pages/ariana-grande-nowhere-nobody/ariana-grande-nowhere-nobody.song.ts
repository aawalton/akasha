import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeNowhereNobody = {
  id: "01a0b76f-ef57-7eac-9bf3-a2e52d369fe6",
  type: "page-type/song",
  slug: "ariana-grande-nowhere-nobody",
  title: "nowhere, nobody",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
