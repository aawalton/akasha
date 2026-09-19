import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysOurSaviorsLove = {
  id: "01a0b783-7d5b-7344-bf7c-6ea983d3cc41",
  type: "page-type/song",
  slug: "the-piano-guys-our-saviors-love",
  title: "Our Savior's Love",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
