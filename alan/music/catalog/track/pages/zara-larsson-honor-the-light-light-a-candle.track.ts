import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonHonorTheLightLightACandle = {
  id: "01a0aa7c-3905-7984-bd9a-ca921a57e761",
  type: "page-type/track",
  slug: "zara-larsson-honor-the-light-light-a-candle",
  ownLength: 3.1788833333333333,
  ownProgress: 3.1788833333333333,
  partOfCollections: ["release/zara-larsson-honor-the-light"],
  status: "completed",
  unit: "unit/minutes",
  title: "Light A Candle",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "lightacandle|1Xylc3o4UrD53lo9CvFvVg|190733",
  song: "song/zara-larsson-light-a-candle",
  carriedBy: [
    {
      release: "release/zara-larsson-honor-the-light",
      discNumber: 1,
      position: 4,
      externalId: "7pNPlw6Jojwm0WnotDNSJx",
      externalLink: "https://open.spotify.com/track/7pNPlw6Jojwm0WnotDNSJx",
    },
  ],
} as const satisfies Track
