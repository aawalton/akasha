import type { Song } from "../../song.page-type.ts"

export const siaPassenger = {
  id: "019ea4cc-814c-79a5-8392-b26a98102b75",
  pageTypeSlug: "song",
  slug: "sia-passenger",
  title: "Passenger",
  artistSlug: "sia",
  externalId: "6454f6cc-24e7-4955-9f97-75918fa559ff",
  externalLink: "https://musicbrainz.org/work/6454f6cc-24e7-4955-9f97-75918fa559ff",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  written: "collab",
} as const satisfies Song
