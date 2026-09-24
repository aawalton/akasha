import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleHello = {
  id: "01a0d52b-c259-7a84-b1c0-567f2d538c69",
  type: "page-type/song",
  slug: "adele-hello",
  title: "Hello",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
