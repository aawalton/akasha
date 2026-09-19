import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallChange = {
  id: "01a0b77e-a950-7dbb-af89-2e89b178f7d4",
  type: "page-type/song",
  slug: "paul-cardall-change",
  title: "Change",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
