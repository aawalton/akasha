import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleDaydreamer = {
  id: "01a0d52b-c259-7f43-9dd3-149ea20ded85",
  type: "page-type/song",
  slug: "adele-daydreamer",
  title: "Daydreamer",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
