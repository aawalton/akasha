import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaTokyoWaYoruNoShichiji = {
  id: "01a0d52b-52da-707a-a2e6-f3fac7674f84",
  type: "page-type/song",
  slug: "rockapella-tokyo-wa-yoru-no-shichiji",
  title: "Tokyo Wa Yoru No Shichiji",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
