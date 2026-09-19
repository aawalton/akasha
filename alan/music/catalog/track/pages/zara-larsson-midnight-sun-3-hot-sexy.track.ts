import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSun3HotSexy = {
  id: "01a0aa7c-29cd-70e7-b589-0fd938620f30",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-3-hot-sexy",
  ownLength: 3.15585,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-midnight-sun-3"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6XcyAXAYKQD7FqCG2F2xOu",
      externalLink: "https://open.spotify.com/track/6XcyAXAYKQD7FqCG2F2xOu",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Hot & Sexy",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "hotsexy|1Xylc3o4UrD53lo9CvFvVg|189351",
  song: "song/zara-larsson-hot-sexy",
} as const satisfies Track
