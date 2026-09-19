import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonUncoverRooftop = {
  id: "01a0aa7c-42eb-7ec1-aa38-79b4c9f50ecf",
  type: "page-type/track",
  slug: "zara-larsson-uncover-rooftop",
  ownLength: 3.9922666666666666,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-uncover"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4JKdEJW98WkBcBi6cB0d89",
      externalLink: "https://open.spotify.com/track/4JKdEJW98WkBcBi6cB0d89",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Rooftop",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "rooftop|1Xylc3o4UrD53lo9CvFvVg|239536",
  song: "song/zara-larsson-rooftop",
} as const satisfies Track
