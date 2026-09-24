import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaMomentsOfYou = {
  id: "01a0d52b-52d9-743b-a1b7-89a85975a5c7",
  type: "page-type/song",
  slug: "rockapella-moments-of-you",
  title: "Moments of You",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
