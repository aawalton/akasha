import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaSilverBells = {
  id: "01a0d52b-52d9-7e23-82a1-3d1a1a92c0bc",
  type: "page-type/song",
  slug: "rockapella-silver-bells",
  title: "Silver Bells",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
