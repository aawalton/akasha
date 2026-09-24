import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaJingleBellRock = {
  id: "01a0d52b-52d9-7bf3-bcb0-90c5a2ee0448",
  type: "page-type/song",
  slug: "rockapella-jingle-bell-rock",
  title: "Jingle Bell Rock",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
