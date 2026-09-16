import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonAllTheTimeAllTheTime = {
  id: "01a0aa7c-3e08-7620-a35d-8009c40110b1",
  type: "page-type/track",
  slug: "zara-larsson-all-the-time-all-the-time",
  ownLength: 3.8018666666666667,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-all-the-time"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3OTSBoYKO7HzGVj8Bu2OH9",
      externalLink: "https://open.spotify.com/track/3OTSBoYKO7HzGVj8Bu2OH9",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "All the Time",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "allthetime|1Xylc3o4UrD53lo9CvFvVg|228112",
} as const satisfies Track
