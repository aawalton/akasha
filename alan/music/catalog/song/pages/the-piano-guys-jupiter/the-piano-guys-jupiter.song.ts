import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysJupiter = {
  id: "01a0b780-18bd-7994-b72b-1996aa9d455f",
  type: "page-type/song",
  slug: "the-piano-guys-jupiter",
  title: "Jupiter",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
