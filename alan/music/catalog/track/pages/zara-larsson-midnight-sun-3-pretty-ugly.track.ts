import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSun3PrettyUgly = {
  id: "01a0aa7c-2931-7634-85ac-b31d7c5cb4af",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-3-pretty-ugly",
  ownLength: 2.6449333333333334,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-midnight-sun-3"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5FYkRxeoLfVxMqyfNR6TMQ",
      externalLink: "https://open.spotify.com/track/5FYkRxeoLfVxMqyfNR6TMQ",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Pretty Ugly",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "prettyugly|1Xylc3o4UrD53lo9CvFvVg|158696",
} as const satisfies Track
