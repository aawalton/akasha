import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaOLittleTownOfBethlehem = {
  id: "01a0d52b-52d9-7829-81d8-c2bf4dc8d89c",
  type: "page-type/song",
  slug: "rockapella-o-little-town-of-bethlehem",
  title: "O Little Town Of Bethlehem",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
