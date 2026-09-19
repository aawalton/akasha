import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraDreams = {
  id: "01a0b770-e8c0-7c7c-aef1-6a1c089eb0d2",
  type: "page-type/song",
  slug: "aurora-dreams",
  title: "Dreams",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
