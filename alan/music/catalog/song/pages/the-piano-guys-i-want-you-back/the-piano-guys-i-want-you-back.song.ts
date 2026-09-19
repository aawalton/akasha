import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysIWantYouBack = {
  id: "01a0b780-46d5-7e7e-8fa2-820d6e83ed0c",
  type: "page-type/song",
  slug: "the-piano-guys-i-want-you-back",
  title: "I Want You Back",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
