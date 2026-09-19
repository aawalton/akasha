import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallABlueWorld = {
  id: "01a0b77d-72a7-7cd4-b5d3-0f05f7b4316a",
  type: "page-type/song",
  slug: "paul-cardall-a-blue-world",
  title: "A Blue World",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
