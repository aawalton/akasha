import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysGhost = {
  id: "01a0b780-3f13-7825-9de6-536d594c650c",
  type: "page-type/song",
  slug: "the-piano-guys-ghost",
  title: "Ghost",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
