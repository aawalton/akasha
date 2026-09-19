import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysThinkingOutLoud = {
  id: "01a0b780-0963-7c38-b99b-8e55c9bc779a",
  type: "page-type/song",
  slug: "the-piano-guys-thinking-out-loud",
  title: "Thinking Out Loud",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
