import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallJennasDance = {
  id: "01a0b77e-c3f2-7ceb-94e2-5d102599128a",
  type: "page-type/song",
  slug: "paul-cardall-jennas-dance",
  title: "Jenna's Dance",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
