import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysASkyFullOfStars = {
  id: "01a0b77f-f89a-7e7a-85d2-220b5daeaae8",
  type: "page-type/song",
  slug: "the-piano-guys-a-sky-full-of-stars",
  title: "A Sky Full of Stars",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
