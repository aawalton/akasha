import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTopaz = {
  id: "01a0b77d-1001-768a-b2e8-6a305f3d6fbb",
  type: "page-type/song",
  slug: "paul-cardall-topaz",
  title: "Topaz",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
