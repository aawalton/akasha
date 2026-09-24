import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaBeliever = {
  id: "01a0d52b-52d7-7410-8884-326dcbfcbee7",
  type: "page-type/song",
  slug: "rockapella-believer",
  title: "Believer",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
