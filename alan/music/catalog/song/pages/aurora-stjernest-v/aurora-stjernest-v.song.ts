import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraStjernestV = {
  id: "01a0b770-d656-766c-9422-3c1519731083",
  type: "page-type/song",
  slug: "aurora-stjernest-v",
  title: "Stjernestøv",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
