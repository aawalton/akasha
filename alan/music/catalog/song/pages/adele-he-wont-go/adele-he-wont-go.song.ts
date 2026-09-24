import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleHeWontGo = {
  id: "01a0d52b-c259-7d7f-85f8-e79a56b49b76",
  type: "page-type/song",
  slug: "adele-he-wont-go",
  title: "He Won't Go",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
