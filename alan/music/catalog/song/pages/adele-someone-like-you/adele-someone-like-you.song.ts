import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleSomeoneLikeYou = {
  id: "01a0d52b-c259-776b-bfed-89a9573c1f8f",
  type: "page-type/song",
  slug: "adele-someone-like-you",
  title: "Someone Like You",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
