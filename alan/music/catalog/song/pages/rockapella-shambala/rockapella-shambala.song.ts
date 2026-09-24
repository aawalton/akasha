import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaShambala = {
  id: "01a0d52b-52d9-77b3-bc1c-abbfd643dea8",
  type: "page-type/song",
  slug: "rockapella-shambala",
  title: "Shambala",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
