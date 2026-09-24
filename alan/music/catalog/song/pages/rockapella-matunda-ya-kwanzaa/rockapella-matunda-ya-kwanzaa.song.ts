import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaMatundaYaKwanzaa = {
  id: "01a0d52b-52d9-789a-bba1-05b6ba03f0c1",
  type: "page-type/song",
  slug: "rockapella-matunda-ya-kwanzaa",
  title: "Matunda Ya Kwanzaa",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
