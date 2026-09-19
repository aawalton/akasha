import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysInTheStars = {
  id: "01a0b780-483c-7318-979c-a7007b615164",
  type: "page-type/song",
  slug: "the-piano-guys-in-the-stars",
  title: "In The Stars",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
