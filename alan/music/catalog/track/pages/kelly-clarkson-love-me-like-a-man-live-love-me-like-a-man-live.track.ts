import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonLoveMeLikeAManLiveLoveMeLikeAManLive = {
  id: "01a0a5ae-daf1-7c08-b84b-275be7805b94",
  type: "track",
  slug: "kelly-clarkson-love-me-like-a-man-live-love-me-like-a-man-live",
  ownLength: 3.2367,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-love-me-like-a-man-live"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5aRcZGYYPvmbpIyt0ZZ13e",
      externalLink: "https://open.spotify.com/track/5aRcZGYYPvmbpIyt0ZZ13e",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Love Me Like a Man - Live",
} as const satisfies Track
