import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lynLapidTheSimlishSong = {
  id: "01a0c95e-b8fd-7783-9fb2-a01fafb437fc",
  type: "page-type/song",
  slug: "lyn-lapid-the-simlish-song",
  title: "the simlish song",
  artist: "artist/lyn-lapid",
  performed: true,
} as const satisfies Song
