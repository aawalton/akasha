import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaWorkinMyWayToYou = {
  id: "01a0d52b-52da-72eb-afda-2cc3768ad4e3",
  type: "page-type/song",
  slug: "rockapella-workin-my-way-to-you",
  title: "Workin My Way to You",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
