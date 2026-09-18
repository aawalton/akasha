import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLivingForEden1987 = {
  id: "01a0b4c8-4c77-70ed-bef0-596ef4fc238b",
  type: "page-type/track",
  slug: "paul-cardall-living-for-eden-1987",
  ownLength: 5.37555,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-living-for-eden"],
  position: 24,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4fBovRr0EbQiKDrxGdoUhU",
      externalLink: "https://open.spotify.com/track/4fBovRr0EbQiKDrxGdoUhU",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "1987",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "1987|7FQRbf8gbKw8KZQZAJWxH2|322533",
} as const satisfies Track
