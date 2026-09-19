import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraTheEssence = {
  id: "01a0b770-f294-7adb-8738-cb55e011e835",
  type: "page-type/song",
  slug: "aurora-the-essence",
  title: "The Essence",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
