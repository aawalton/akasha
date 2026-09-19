import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysTheStoryteller = {
  id: "01a0b783-65e3-7d07-9fc6-5b1845f05a24",
  type: "page-type/song",
  slug: "the-piano-guys-the-storyteller",
  title: "The Storyteller",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
