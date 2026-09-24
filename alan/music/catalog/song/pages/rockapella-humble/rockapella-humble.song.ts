import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaHumble = {
  id: "01a0d52b-52d8-7212-b51c-d92d3b4c419e",
  type: "page-type/song",
  slug: "rockapella-humble",
  title: "Humble",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
