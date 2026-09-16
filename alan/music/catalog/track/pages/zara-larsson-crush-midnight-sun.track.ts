import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonCrushMidnightSun = {
  id: "01a0aa7c-36e1-7081-9b78-8567ced449ac",
  type: "page-type/track",
  slug: "zara-larsson-crush-midnight-sun",
  ownLength: 3.1649666666666665,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-crush"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7f2QxIIuSDKuOoDonweNsu",
      externalLink: "https://open.spotify.com/track/7f2QxIIuSDKuOoDonweNsu",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Midnight Sun",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "midnightsun|1Xylc3o4UrD53lo9CvFvVg|189898",
} as const satisfies Track
