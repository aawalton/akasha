import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaBetter2gether = {
  id: "01a0d52b-52d7-7e54-a465-ba112e84b405",
  type: "page-type/song",
  slug: "rockapella-better-2gether",
  title: "Better 2gether",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
