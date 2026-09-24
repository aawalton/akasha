import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaBringSomeLove = {
  id: "01a0d52b-52d7-7ffe-bcc8-68e11dfbe1a3",
  type: "page-type/song",
  slug: "rockapella-bring-some-love",
  title: "Bring Some Love",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
