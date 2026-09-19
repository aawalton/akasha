import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysSomeoneLikeYou = {
  id: "01a0b780-1b17-7e6d-93f5-a43100124a06",
  type: "page-type/song",
  slug: "the-piano-guys-someone-like-you",
  title: "Someone Like You",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
