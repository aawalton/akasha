import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysSomeoneToYou = {
  id: "01a0b780-06ea-75cc-8bad-6edb33a4402c",
  type: "page-type/song",
  slug: "the-piano-guys-someone-to-you",
  title: "Someone To You",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
