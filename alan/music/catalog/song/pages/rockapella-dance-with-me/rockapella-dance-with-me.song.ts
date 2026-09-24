import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaDanceWithMe = {
  id: "01a0d52b-52d8-774f-abea-624795dd0451",
  type: "page-type/song",
  slug: "rockapella-dance-with-me",
  title: "Dance With Me",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
