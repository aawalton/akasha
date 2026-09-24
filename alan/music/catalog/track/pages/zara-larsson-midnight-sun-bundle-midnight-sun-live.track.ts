import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonMidnightSunBundleMidnightSunLive = {
  id: "01a0aa7c-372c-7f6e-96b0-28b7e66557bc",
  type: "page-type/track",
  slug: "zara-larsson-midnight-sun-bundle-midnight-sun-live",
  ownLength: 3.9801166666666665,
  ownProgress: 3.9801166666666665,
  partOfCollections: ["release/zara-larsson-midnight-sun-bundle"],
  status: "completed",
  unit: "unit/minutes",
  title: "Midnight Sun - Live",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "midnightsunlive|1Xylc3o4UrD53lo9CvFvVg|238807",
  song: "song/zara-larsson-midnight-sun",
  carriedBy: [
    {
      release: "release/zara-larsson-midnight-sun-bundle",
      discNumber: 1,
      position: 1,
      externalId: "1IgRVcDdvpiqlwJpmBp7Ku",
      externalLink: "https://open.spotify.com/track/1IgRVcDdvpiqlwJpmBp7Ku",
    },
  ],
} as const satisfies Track
