import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysISawThreeShips = {
  id: "01a0b780-24e7-7706-aff4-db07eb1cf900",
  type: "page-type/song",
  slug: "the-piano-guys-i-saw-three-ships",
  title: "I Saw Three Ships",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
