import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonVenusYouLoveWhoYouLove = {
  id: "01a0aa7c-2b1e-7c9b-8804-ab8c9fa3c2d7",
  type: "page-type/track",
  slug: "zara-larsson-venus-you-love-who-you-love",
  ownLength: 3.0957166666666667,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-venus"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3bWHOxTJpHL6fyATpYFQXl",
      externalLink: "https://open.spotify.com/track/3bWHOxTJpHL6fyATpYFQXl",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "You Love Who You Love",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "youlovewhoyoulove|1Xylc3o4UrD53lo9CvFvVg|185743",
  song: "song/zara-larsson-you-love-who-you-love",
} as const satisfies Track
