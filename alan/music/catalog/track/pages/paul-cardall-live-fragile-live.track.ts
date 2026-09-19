import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallLiveFragileLive = {
  id: "01a0b4c8-57c9-79a5-9b25-6322551b94c0",
  type: "page-type/track",
  slug: "paul-cardall-live-fragile-live",
  ownLength: 2.8391,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-live"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7pMcj48agTjNSkRqOTZJ7q",
      externalLink: "https://open.spotify.com/track/7pMcj48agTjNSkRqOTZJ7q",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Fragile - Live",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "fragilelive|7FQRbf8gbKw8KZQZAJWxH2|170346",
  song: "song/paul-cardall-fragile",
} as const satisfies Track
