import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaEllieMyLove = {
  id: "01a0d52b-52d8-7e9b-98ec-5cdb650b600c",
  type: "page-type/song",
  slug: "rockapella-ellie-my-love",
  title: "Ellie My Love",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
