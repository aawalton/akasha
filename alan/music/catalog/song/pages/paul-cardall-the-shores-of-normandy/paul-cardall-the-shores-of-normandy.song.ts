import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTheShoresOfNormandy = {
  id: "01a0b77e-dd06-7ee3-af54-80c41efc7b8f",
  type: "page-type/song",
  slug: "paul-cardall-the-shores-of-normandy",
  title: "The Shores of Normandy",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
