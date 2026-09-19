import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysBeforeYouGo = {
  id: "01a0b780-137b-7a7f-932c-130b4028598c",
  type: "page-type/song",
  slug: "the-piano-guys-before-you-go",
  title: "Before You Go",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
