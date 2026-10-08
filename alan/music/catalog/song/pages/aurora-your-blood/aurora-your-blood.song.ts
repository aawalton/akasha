import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraYourBlood = {
  id: "01a0b770-db37-7078-90a7-68d5244bf9f8",
  type: "page-type/song",
  slug: "aurora-your-blood",
  title: "Your Blood",
  artist: "artist/aurora",
  performed: true,
  createdAt: "2026-09-19T02:13:41.815Z",
  updatedAt: "2026-09-19T02:15:26.000Z",
} as const satisfies Song
