import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaWhereWouldWeBe = {
  id: "01a0d52b-52da-73f0-a60c-7d8a50c02447",
  type: "page-type/song",
  slug: "rockapella-where-would-we-be",
  title: "Where Would We Be?",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
