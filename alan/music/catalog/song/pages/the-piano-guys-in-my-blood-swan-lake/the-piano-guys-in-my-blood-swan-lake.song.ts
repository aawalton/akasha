import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysInMyBloodSwanLake = {
  id: "01a0b780-4e91-7afc-8a79-544a49b5b747",
  type: "page-type/song",
  slug: "the-piano-guys-in-my-blood-swan-lake",
  title: "In My Blood / Swan Lake",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
