import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysSomeoneYouLoved = {
  id: "01a0b780-0827-7b35-b922-a74d309e9c6a",
  type: "page-type/song",
  slug: "the-piano-guys-someone-you-loved",
  title: "Someone You Loved",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
