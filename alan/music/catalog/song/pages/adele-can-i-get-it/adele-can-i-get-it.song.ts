import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleCanIGetIt = {
  id: "01a0d52b-c259-79e9-ac33-8c7ad7fbf1de",
  type: "page-type/song",
  slug: "adele-can-i-get-it",
  title: "Can I Get It",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
