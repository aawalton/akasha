import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonSoGoodIWouldLike = {
  id: "01a0aa7c-3270-735f-b0a1-dbe9c29a2a38",
  type: "page-type/track",
  slug: "zara-larsson-so-good-i-would-like",
  ownLength: 3.7429333333333332,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-so-good"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4Q4jmPHwu0wrJvqrld0FQ6",
      externalLink: "https://open.spotify.com/track/4Q4jmPHwu0wrJvqrld0FQ6",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "I Would Like",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "iwouldlike|1Xylc3o4UrD53lo9CvFvVg|224576",
  song: "song/zara-larsson-i-would-like",
} as const satisfies Track
