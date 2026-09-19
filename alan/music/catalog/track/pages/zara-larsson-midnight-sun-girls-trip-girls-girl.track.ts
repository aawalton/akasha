import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSunGirlsTripGirlsGirl = {
  id: "01a0aa7c-2202-7ffe-92de-487baf09734f",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-girls-trip-girls-girl",
  ownLength: 2.970683333333333,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-midnight-sun-girls-trip"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0QKxuZ3TKrRlhLeEkhNdaH",
      externalLink: "https://open.spotify.com/track/0QKxuZ3TKrRlhLeEkhNdaH",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Girl's Girl",
  trackType: "studio",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "girlsgirl|1Xylc3o4UrD53lo9CvFvVg|178241",
  song: "song/zara-larsson-girl-s-girl",
} as const satisfies Track
