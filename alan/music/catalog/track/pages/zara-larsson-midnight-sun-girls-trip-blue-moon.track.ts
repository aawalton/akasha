import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSunGirlsTripBlueMoon = {
  id: "01a0aa7c-21be-7da5-bdeb-d5b41349ead1",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-girls-trip-blue-moon",
  ownLength: 3.03425,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-midnight-sun-girls-trip"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "00lTHGMQ7Z1pA6cXMKCCc7",
      externalLink: "https://open.spotify.com/track/00lTHGMQ7Z1pA6cXMKCCc7",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Blue Moon",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "bluemoon|1Xylc3o4UrD53lo9CvFvVg|182055",
} as const satisfies Track
