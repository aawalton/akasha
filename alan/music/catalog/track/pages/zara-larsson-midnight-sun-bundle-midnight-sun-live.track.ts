import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSunBundleMidnightSunLive = {
  id: "01a0aa7c-372c-7f6e-96b0-28b7e66557bc",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-bundle-midnight-sun-live",
  ownLength: 3.9801166666666665,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-midnight-sun-bundle"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1IgRVcDdvpiqlwJpmBp7Ku",
      externalLink: "https://open.spotify.com/track/1IgRVcDdvpiqlwJpmBp7Ku",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Midnight Sun - Live",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "midnightsunlive|1Xylc3o4UrD53lo9CvFvVg|238807",
  song: "song/zara-larsson-midnight-sun",
} as const satisfies Track
