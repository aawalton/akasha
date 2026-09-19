import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallGratitude = {
  id: "01a0b77d-dccb-7073-9bda-99e8adfe36f0",
  type: "page-type/song",
  slug: "paul-cardall-gratitude",
  title: "Gratitude",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
