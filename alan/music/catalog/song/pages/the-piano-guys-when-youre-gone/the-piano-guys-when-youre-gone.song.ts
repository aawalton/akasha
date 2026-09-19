import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysWhenYoureGone = {
  id: "01a0b783-5db4-7fa2-913f-76fc5af03984",
  type: "page-type/song",
  slug: "the-piano-guys-when-youre-gone",
  title: "When You're Gone",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
