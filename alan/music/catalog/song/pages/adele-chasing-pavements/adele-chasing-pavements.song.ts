import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleChasingPavements = {
  id: "01a0d52b-c259-7d56-9059-38a04267cff3",
  type: "page-type/song",
  slug: "adele-chasing-pavements",
  title: "Chasing Pavements",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
