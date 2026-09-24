import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaPeaceOnEarth = {
  id: "01a0d52b-52d9-793b-9c90-67c64f060323",
  type: "page-type/song",
  slug: "rockapella-peace-on-earth",
  title: "Peace on Earth",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
