import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaBounceBack = {
  id: "01a0d52b-52d7-7209-9406-582d442926cf",
  type: "page-type/song",
  slug: "rockapella-bounce-back",
  title: "Bounce Back",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
