import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBestDayEver = {
  id: "019ea4c4-ea5f-75cc-9c41-3924fb1b0488",
  type: "page-type/song",
  slug: "sia-best-day-ever",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9785965d-39e6-40d4-8567-14810a2c1401",
      externalLink: "https://musicbrainz.org/work/9785965d-39e6-40d4-8567-14810a2c1401",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Best Day Ever",
  artist: "artist/sia",
  performed: false,
  written: "collab",
} as const satisfies Song
