import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallHeartsOfMothers = {
  id: "01a0b77c-f279-771b-9b4f-94a12ed6b95f",
  type: "page-type/song",
  slug: "paul-cardall-hearts-of-mothers",
  title: "Hearts of Mothers",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
