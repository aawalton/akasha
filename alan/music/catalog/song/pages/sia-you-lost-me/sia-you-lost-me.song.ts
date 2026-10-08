import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaYouLostMe = {
  id: "019ea4cb-20b3-77d6-89d1-b743cb5a974b",
  type: "page-type/song",
  slug: "sia-you-lost-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1f58f9b8-1c41-31a4-9707-4d6eaaf5b38d",
      externalLink: "https://musicbrainz.org/work/1f58f9b8-1c41-31a4-9707-4d6eaaf5b38d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You Lost Me",
  artist: "artist/sia",
  performed: false,
  written: "collab",
  createdAt: "2026-06-08T01:13:56.147Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
