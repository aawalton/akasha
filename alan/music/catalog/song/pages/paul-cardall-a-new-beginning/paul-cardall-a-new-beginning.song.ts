import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallANewBeginning = {
  id: "01a0b77e-4c2c-77e5-9a15-ff18e2203e70",
  type: "page-type/song",
  slug: "paul-cardall-a-new-beginning",
  title: "A New Beginning",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
