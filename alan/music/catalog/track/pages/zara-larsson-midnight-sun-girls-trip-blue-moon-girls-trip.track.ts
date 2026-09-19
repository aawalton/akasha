import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSunGirlsTripBlueMoonGirlsTrip = {
  id: "01a0aa7c-2056-7d76-a87d-f67ec9416802",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-girls-trip-blue-moon-girls-trip",
  ownLength: 3.21205,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-midnight-sun-girls-trip"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7pVos5ARWPPoss91LDu9Hx",
      externalLink: "https://open.spotify.com/track/7pVos5ARWPPoss91LDu9Hx",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Blue Moon - Girls Trip",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "0cGUm45nv7Z6M6qdXYQGTX", artistName: "Kehlani" },
  ],
  trackKey: "bluemoongirlstrip|0cGUm45nv7Z6M6qdXYQGTX,1Xylc3o4UrD53lo9CvFvVg|192723",
  song: "song/zara-larsson-blue-moon-girls-trip",
} as const satisfies Track
