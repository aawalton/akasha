import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraFollowMe = {
  id: "01a0b770-f8e2-7a5f-aeeb-19c775303a27",
  type: "page-type/song",
  slug: "aurora-follow-me",
  title: "Follow Me",
  artist: "artist/aurora",
  performed: true,
  createdAt: "2026-09-19T02:13:49.410Z",
  updatedAt: "2026-09-19T02:15:26.000Z",
} as const satisfies Song
