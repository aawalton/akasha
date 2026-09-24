import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaRudolphTheRedNosedReindeer = {
  id: "01a0d52b-52d9-7a1d-9d73-07d97a7d992e",
  type: "page-type/song",
  slug: "rockapella-rudolph-the-red-nosed-reindeer",
  title: "Rudolph the Red-Nosed Reindeer",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
