import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraStorm = {
  id: "01a0b770-d8b1-75a0-8dc6-475d9ff9fa78",
  type: "page-type/song",
  slug: "aurora-storm",
  title: "Storm",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
