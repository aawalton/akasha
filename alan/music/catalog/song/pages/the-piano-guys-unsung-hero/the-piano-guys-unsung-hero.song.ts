import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysUnsungHero = {
  id: "01a0b783-711d-72b9-8538-4da77263ccc4",
  type: "page-type/song",
  slug: "the-piano-guys-unsung-hero",
  title: "Unsung Hero",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
