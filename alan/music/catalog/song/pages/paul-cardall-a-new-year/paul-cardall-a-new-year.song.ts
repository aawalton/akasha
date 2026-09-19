import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallANewYear = {
  id: "01a0b77d-5535-7719-b3fd-92467c11ed9f",
  type: "page-type/song",
  slug: "paul-cardall-a-new-year",
  title: "A New Year",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
