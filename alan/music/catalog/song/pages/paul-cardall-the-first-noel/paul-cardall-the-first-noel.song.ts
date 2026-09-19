import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTheFirstNoel = {
  id: "01a0b77a-14f7-77ab-afdf-81e7509fb4b9",
  type: "page-type/song",
  slug: "paul-cardall-the-first-noel",
  title: "The First Noel",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
