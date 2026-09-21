import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonGirlsGirlGirlsTripGirlsGirlGirlsTrip = {
  id: "01a0aa7c-2404-7204-9bbc-efc1b24ff308",
  type: "page-type/track",
  slug: "zara-larsson-girls-girl-girls-trip-girls-girl-girls-trip",
  ownLength: 3.265216666666667,
  ownProgress: 0,
  partOfCollections: [
    "release/zara-larsson-girls-girl-girls-trip",
    "release/zara-larsson-midnight-sun-girls-trip",
  ],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3nFTbFUDsIluGyra5jIyKJ",
      externalLink: "https://open.spotify.com/track/3nFTbFUDsIluGyra5jIyKJ",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Girl's Girl - Girls Trip",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [
    { externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" },
    { externalId: "0AqlFI0tz2DsEoJlKSIiT9", artistName: "Emilia" },
  ],
  trackKey: "girlsgirlgirlstrip|0AqlFI0tz2DsEoJlKSIiT9,1Xylc3o4UrD53lo9CvFvVg|195913",
  song: "song/zara-larsson-girls-girl-girls-trip",
  carriedBy: [
    {
      release: "release/zara-larsson-girls-girl-girls-trip",
      discNumber: 1,
      position: 1,
      externalId: "3nFTbFUDsIluGyra5jIyKJ",
      externalLink: "https://open.spotify.com/track/3nFTbFUDsIluGyra5jIyKJ",
    },
    {
      release: "release/zara-larsson-midnight-sun-girls-trip",
      discNumber: 1,
      position: 4,
      externalId: "1eA6Uh2q01uLdV8aXupWtY",
      externalLink: "https://open.spotify.com/track/1eA6Uh2q01uLdV8aXupWtY",
    },
  ],
} as const satisfies Track
