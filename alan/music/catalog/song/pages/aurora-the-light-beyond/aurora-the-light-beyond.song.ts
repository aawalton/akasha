import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraTheLightBeyond = {
  id: "01a0b770-ce91-7e6e-b289-9a9afb94b140",
  type: "page-type/song",
  slug: "aurora-the-light-beyond",
  title: "The Light Beyond",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
