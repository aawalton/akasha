import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallBlueHeaven = {
  id: "01a0b77d-7ca3-7b4b-86a2-bbb697376488",
  type: "page-type/song",
  slug: "paul-cardall-blue-heaven",
  title: "Blue Heaven",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
