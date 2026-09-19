import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraToBeAlright = {
  id: "01a0b770-e02d-73f5-a5b1-0854c8e78a76",
  type: "page-type/song",
  slug: "aurora-to-be-alright",
  title: "To Be Alright",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
