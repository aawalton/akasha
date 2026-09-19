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
  songType: "original",
  performed: false,
  written: "collab",
} as const satisfies Song
