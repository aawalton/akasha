import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonBreakawaySinceUBeenGone = {
  id: "01a0a5ae-cb67-7680-8d87-bc8b8448ad12",
  type: "track",
  slug: "kelly-clarkson-breakaway-since-u-been-gone",
  ownLength: 3.1493333333333333,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-breakaway"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3xrn9i8zhNZsTtcoWgQEAd",
      externalLink: "https://open.spotify.com/track/3xrn9i8zhNZsTtcoWgQEAd",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Since U Been Gone",
} as const satisfies Track
