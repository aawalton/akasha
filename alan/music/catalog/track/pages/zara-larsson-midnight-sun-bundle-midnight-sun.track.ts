import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSunBundleMidnightSun = {
  id: "01a0aa7c-3776-75cf-9ac3-395eb7634f0f",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-bundle-midnight-sun",
  ownLength: 3.1649666666666665,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-midnight-sun-bundle"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "43L9D7gxs7EluuJcd5ALWr",
      externalLink: "https://open.spotify.com/track/43L9D7gxs7EluuJcd5ALWr",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Midnight Sun",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "midnightsun|1Xylc3o4UrD53lo9CvFvVg|189898",
} as const satisfies Track
