import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaReasonableWomanIHadAHeart = {
  id: "01a0a59b-f8fd-7827-b359-02cd4e398f0a",
  type: "track",
  slug: "sia-reasonable-woman-i-had-a-heart",
  ownLength: 2.80855,
  ownProgress: 0,
  partOfCollections: ["release/sia-reasonable-woman"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4NELvFAhzenCH7pJzZYmZT",
      externalLink: "https://open.spotify.com/track/4NELvFAhzenCH7pJzZYmZT",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "I Had A Heart",
} as const satisfies Track
