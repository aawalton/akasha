import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaIsItInYou = {
  id: "01a0d52b-52d9-73a6-80d5-6984b10e7119",
  type: "page-type/song",
  slug: "rockapella-is-it-in-you",
  title: "Is It in You?",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
