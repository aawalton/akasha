import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallDanzaDelAmor = {
  id: "01a0b77d-2c9f-7d51-9db2-23219cede081",
  type: "page-type/song",
  slug: "paul-cardall-danza-del-amor",
  title: "Danza Del Amor",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
