import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaOnTheLastNight = {
  id: "01a0d52b-52d9-7c21-a844-93f2ca435a51",
  type: "page-type/song",
  slug: "rockapella-on-the-last-night",
  title: "On the Last Night",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
