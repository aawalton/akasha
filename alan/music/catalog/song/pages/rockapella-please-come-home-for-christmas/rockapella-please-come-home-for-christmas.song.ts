import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaPleaseComeHomeForChristmas = {
  id: "01a0d52b-52d9-715d-9d56-cd9ba86ac5f9",
  type: "page-type/song",
  slug: "rockapella-please-come-home-for-christmas",
  title: "Please Come Home for Christmas",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
