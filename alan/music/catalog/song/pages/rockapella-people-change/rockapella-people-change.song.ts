import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaPeopleChange = {
  id: "01a0d52b-52d9-7245-8a23-c682fd60d4c0",
  type: "page-type/song",
  slug: "rockapella-people-change",
  title: "People Change",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
