import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const peterDinklageSomethingBad = {
  id: "01a0b7a7-13b0-7ebf-8902-443a7d11630d",
  type: "page-type/song",
  slug: "peter-dinklage-something-bad",
  title: "Something Bad",
  artist: "artist/peter-dinklage",
  performed: true,
} as const satisfies Song
