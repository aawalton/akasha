import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTheOldRuggedCross = {
  id: "01a0b779-f22d-7527-9a54-b0a760b47875",
  type: "page-type/song",
  slug: "paul-cardall-the-old-rugged-cross",
  title: "The Old Rugged Cross",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
