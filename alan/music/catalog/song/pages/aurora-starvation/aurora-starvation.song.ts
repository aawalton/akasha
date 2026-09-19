import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraStarvation = {
  id: "01a0b770-d4fd-7fde-a377-dfdf32ea5193",
  type: "page-type/song",
  slug: "aurora-starvation",
  title: "Starvation",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
