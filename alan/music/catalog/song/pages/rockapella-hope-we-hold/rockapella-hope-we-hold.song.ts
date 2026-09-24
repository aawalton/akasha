import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaHopeWeHold = {
  id: "01a0d52b-52d8-7006-8b2e-6fcc3ebe9f54",
  type: "page-type/song",
  slug: "rockapella-hope-we-hold",
  title: "Hope We Hold",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
