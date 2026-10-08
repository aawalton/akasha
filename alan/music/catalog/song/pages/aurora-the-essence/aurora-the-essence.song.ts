import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraTheEssence = {
  id: "01a0b770-f294-7adb-8738-cb55e011e835",
  type: "page-type/song",
  slug: "aurora-the-essence",
  title: "The Essence",
  artist: "artist/aurora",
  performed: true,
  createdAt: "2026-09-19T02:13:47.796Z",
  updatedAt: "2026-09-19T02:15:26.000Z",
} as const satisfies Song
