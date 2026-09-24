import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleIMissYou = {
  id: "01a0d52b-c259-7839-90fc-57572d51e4c6",
  type: "page-type/song",
  slug: "adele-i-miss-you",
  title: "I Miss You",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
