import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonBreakawayYouFoundMe = {
  id: "01a0a5ae-cc25-7691-a3f5-4fbebdba95c2",
  type: "page-type/track",
  slug: "kelly-clarkson-breakaway-you-found-me",
  ownLength: 3.6677666666666666,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-breakaway"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3lmcmfMOfVyjqnmI4rNQDA",
      externalLink: "https://open.spotify.com/track/3lmcmfMOfVyjqnmI4rNQDA",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "You Found Me",
} as const satisfies Track
