import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysFlicker = {
  id: "01a0b780-3c01-7461-982e-b9454460ccb8",
  type: "page-type/song",
  slug: "the-piano-guys-flicker",
  title: "Flicker",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
