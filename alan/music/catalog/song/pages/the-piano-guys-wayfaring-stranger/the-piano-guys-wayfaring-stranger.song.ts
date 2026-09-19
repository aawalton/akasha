import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysWayfaringStranger = {
  id: "01a0b783-60ee-724d-a95b-5aa5e151b67b",
  type: "page-type/song",
  slug: "the-piano-guys-wayfaring-stranger",
  title: "Wayfaring Stranger",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
