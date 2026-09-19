import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallHeartsOfTheFathers = {
  id: "01a0b77d-5cf4-73ee-b738-dc779246837f",
  type: "page-type/song",
  slug: "paul-cardall-hearts-of-the-fathers",
  title: "Hearts of The Fathers",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
