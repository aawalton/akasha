import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonHonorTheLightLightACandle = {
  id: "01a0aa7c-3905-7984-bd9a-ca921a57e761",
  type: "page-type/track",
  slug: "zara-larsson-honor-the-light-light-a-candle",
  ownLength: 3.1788833333333333,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-honor-the-light"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7pNPlw6Jojwm0WnotDNSJx",
      externalLink: "https://open.spotify.com/track/7pNPlw6Jojwm0WnotDNSJx",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Light A Candle",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "lightacandle|1Xylc3o4UrD53lo9CvFvVg|190733",
} as const satisfies Track
