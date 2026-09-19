import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallOMyFather = {
  id: "01a0b77d-9650-7fa3-be83-b0e90db0ebad",
  type: "page-type/song",
  slug: "paul-cardall-o-my-father",
  title: "O My Father",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
