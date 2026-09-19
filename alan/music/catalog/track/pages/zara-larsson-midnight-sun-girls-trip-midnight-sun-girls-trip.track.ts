import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSunGirlsTripMidnightSunGirlsTrip = {
  id: "01a0aa7c-2030-76bb-9f5e-2445df9cf069",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-girls-trip-midnight-sun-girls-trip",
  ownLength: 2.8622666666666667,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-midnight-sun-girls-trip"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2FHGYrQEmuWGX24QoQtQ13",
      externalLink: "https://open.spotify.com/track/2FHGYrQEmuWGX24QoQtQ13",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Midnight Sun - Girls Trip",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "78rUTD7y6Cy67W1RVzYs7t", artistName: "PinkPantheress" },
  ],
  trackKey: "midnightsungirlstrip|1Xylc3o4UrD53lo9CvFvVg,78rUTD7y6Cy67W1RVzYs7t|171736",
  song: "song/zara-larsson-midnight-sun-girls-trip",
} as const satisfies Track
