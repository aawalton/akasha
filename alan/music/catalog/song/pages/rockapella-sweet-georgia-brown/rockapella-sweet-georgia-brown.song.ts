import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaSweetGeorgiaBrown = {
  id: "01a0d52b-52da-7369-9fa5-234a225cc83f",
  type: "page-type/song",
  slug: "rockapella-sweet-georgia-brown",
  title: "Sweet Georgia Brown",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
