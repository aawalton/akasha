import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTwinkleLittleStar = {
  id: "01a0b77d-c985-77b4-ae5e-59f2377f69e9",
  type: "page-type/song",
  slug: "paul-cardall-twinkle-little-star",
  title: "Twinkle Little Star",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
