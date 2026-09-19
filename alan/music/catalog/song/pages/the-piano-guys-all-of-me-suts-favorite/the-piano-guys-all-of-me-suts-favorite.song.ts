import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysAllOfMeSutsFavorite = {
  id: "01a0b783-73b1-7a8b-99fc-8ccfdda19c38",
  type: "page-type/song",
  slug: "the-piano-guys-all-of-me-suts-favorite",
  title: "All of Me (Sut's Favorite)",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
