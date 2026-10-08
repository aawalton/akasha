import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaSoon = {
  id: "019ea4ca-c437-7cd2-a181-c6fa366caae4",
  type: "page-type/song",
  slug: "sia-soon",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "134d0d04-c77c-4198-b588-7be9eafe9b8c",
      externalLink: "https://musicbrainz.org/work/134d0d04-c77c-4198-b588-7be9eafe9b8c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Soon",
  artist: "artist/sia",
  performed: true,
  written: "collab",
  createdAt: "2026-06-08T01:13:32.471Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
