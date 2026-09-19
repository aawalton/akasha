import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysHomecoming = {
  id: "01a0b783-7615-7f57-a555-d95f080919e9",
  type: "page-type/song",
  slug: "the-piano-guys-homecoming",
  title: "Homecoming",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
