import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaCarmenSandiego2020 = {
  id: "01a0d52b-52d8-71bd-b038-761bc8bee5ea",
  type: "page-type/song",
  slug: "rockapella-carmen-sandiego-2020",
  title: "Carmen Sandiego 2020",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
