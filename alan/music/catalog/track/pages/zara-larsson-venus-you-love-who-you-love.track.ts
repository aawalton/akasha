import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonVenusYouLoveWhoYouLove = {
  id: "01a0aa7c-2b1e-7c9b-8804-ab8c9fa3c2d7",
  type: "page-type/track",
  slug: "zara-larsson-venus-you-love-who-you-love",
  ownLength: 3.0957166666666667,
  ownProgress: 3.0957166666666667,
  partOfCollections: ["release/zara-larsson-venus"],
  status: "completed",
  unit: "unit/minutes",
  title: "You Love Who You Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "youlovewhoyoulove|1Xylc3o4UrD53lo9CvFvVg|185743",
  song: "song/zara-larsson-you-love-who-you-love",
  carriedBy: [
    {
      release: "release/zara-larsson-venus",
      discNumber: 1,
      position: 6,
      externalId: "3bWHOxTJpHL6fyATpYFQXl",
      externalLink: "https://open.spotify.com/track/3bWHOxTJpHL6fyATpYFQXl",
    },
  ],
} as const satisfies Track
