import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaBlameItOnTheBoogie = {
  id: "01a0d52b-52d7-76a9-8216-1bf262b7ff73",
  type: "page-type/song",
  slug: "rockapella-blame-it-on-the-boogie",
  title: "Blame It on the Boogie",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
