import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraMechanical = {
  id: "01a0b770-fd43-7490-a587-23ed67984fe7",
  type: "page-type/song",
  slug: "aurora-mechanical",
  title: "Mechanical",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
