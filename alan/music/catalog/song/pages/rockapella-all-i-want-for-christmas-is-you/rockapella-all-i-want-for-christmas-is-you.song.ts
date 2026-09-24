import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaAllIWantForChristmasIsYou = {
  id: "01a0d52b-52d7-75e8-93e7-e07c0dab41b6",
  type: "page-type/song",
  slug: "rockapella-all-i-want-for-christmas-is-you",
  title: "All I Want for Christmas Is You",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
