import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSunGirlsTripMidnightSun = {
  id: "01a0aa7c-219a-776e-99a5-3fe133a10826",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-girls-trip-midnight-sun",
  ownLength: 3.1649666666666665,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-midnight-sun-girls-trip"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7ov4baVjsFFzCwa8kbWhnq",
      externalLink: "https://open.spotify.com/track/7ov4baVjsFFzCwa8kbWhnq",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Midnight Sun",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "midnightsun|1Xylc3o4UrD53lo9CvFvVg|189898",
  song: "song/zara-larsson-midnight-sun",
} as const satisfies Track
