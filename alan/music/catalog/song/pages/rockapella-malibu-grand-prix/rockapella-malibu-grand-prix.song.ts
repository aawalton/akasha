import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaMalibuGrandPrix = {
  id: "01a0d52b-52d9-7d07-a099-dd147d159353",
  type: "page-type/song",
  slug: "rockapella-malibu-grand-prix",
  title: "Malibu Grand Prix",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
