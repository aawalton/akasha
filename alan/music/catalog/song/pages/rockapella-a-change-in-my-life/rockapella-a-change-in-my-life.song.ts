import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaAChangeInMyLife = {
  id: "01a0d52b-52d7-7663-89c9-dd7e72d63376",
  type: "page-type/song",
  slug: "rockapella-a-change-in-my-life",
  title: "A Change in My Life",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
