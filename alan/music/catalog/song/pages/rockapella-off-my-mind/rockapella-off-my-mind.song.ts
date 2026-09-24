import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaOffMyMind = {
  id: "01a0d52b-52d9-7a5c-a817-0218b147cbf5",
  type: "page-type/song",
  slug: "rockapella-off-my-mind",
  title: "Off My Mind",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
