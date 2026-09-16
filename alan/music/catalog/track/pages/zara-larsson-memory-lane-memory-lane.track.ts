import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMemoryLaneMemoryLane = {
  id: "01a0aa7c-380a-75ff-b217-c888b3e66015",
  type: "page-type/track",
  slug: "zara-larsson-memory-lane-memory-lane",
  ownLength: 3.2022166666666667,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-memory-lane"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "624PTd4WB9XanWV1egM2lS",
      externalLink: "https://open.spotify.com/track/624PTd4WB9XanWV1egM2lS",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Memory Lane",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "memorylane|1Xylc3o4UrD53lo9CvFvVg|192133",
} as const satisfies Track
