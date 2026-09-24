import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaBadBoujee = {
  id: "01a0d52b-52d7-7f69-91e8-49fb926da696",
  type: "page-type/song",
  slug: "rockapella-bad-boujee",
  title: "Bad & Boujee",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
