import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysTheFirstNoel = {
  id: "01a0b780-822f-716b-84a1-e2611da8b89c",
  type: "page-type/song",
  slug: "the-piano-guys-the-first-noel",
  title: "The First Noel",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
