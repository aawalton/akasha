import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaHowBoutNow = {
  id: "01a0d52b-52d8-722c-b134-f6ae1de7545a",
  type: "page-type/song",
  slug: "rockapella-how-bout-now",
  title: "How Bout Now",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
