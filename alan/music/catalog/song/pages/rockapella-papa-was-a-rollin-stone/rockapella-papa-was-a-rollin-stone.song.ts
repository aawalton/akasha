import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaPapaWasARollinStone = {
  id: "01a0d52b-52d9-7188-b4d2-0b5cafeabc06",
  type: "page-type/song",
  slug: "rockapella-papa-was-a-rollin-stone",
  title: "Papa Was a Rollin' Stone",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
