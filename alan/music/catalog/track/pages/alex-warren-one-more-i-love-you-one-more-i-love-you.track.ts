import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const alexWarrenOneMoreILoveYouOneMoreILoveYou = {
  id: "01a0a59d-d569-74f7-9bb1-ec96f6951f90",
  type: "track",
  slug: "alex-warren-one-more-i-love-you-one-more-i-love-you",
  ownLength: 3.6155833333333334,
  ownProgress: 0,
  partOfCollections: ["release/alex-warren-one-more-i-love-you"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6QFnwOaQIMd9sZNsd4mUaO",
      externalLink: "https://open.spotify.com/track/6QFnwOaQIMd9sZNsd4mUaO",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "One More I Love You",
} as const satisfies Track
