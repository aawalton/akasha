import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleMillionYearsAgo = {
  id: "01a0d52b-c259-789b-8ebb-2f515cebd27e",
  type: "page-type/song",
  slug: "adele-million-years-ago",
  title: "Million Years Ago",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
