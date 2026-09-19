import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysToTheSummit = {
  id: "01a0b783-7fbc-786d-9950-ff8bd4fdf441",
  type: "page-type/song",
  slug: "the-piano-guys-to-the-summit",
  title: "To The Summit",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
