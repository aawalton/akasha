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
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
