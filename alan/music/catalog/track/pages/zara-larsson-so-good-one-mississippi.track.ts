import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonSoGoodOneMississippi = {
  id: "01a0aa7c-3398-7a36-9978-6d954b9803bd",
  type: "page-type/track",
  slug: "zara-larsson-so-good-one-mississippi",
  ownLength: 3.132833333333333,
  ownProgress: 3.132833333333333,
  partOfCollections: ["release/zara-larsson-so-good"],
  status: "completed",
  unit: "unit/minutes",
  title: "One Mississippi",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "onemississippi|1Xylc3o4UrD53lo9CvFvVg|187970",
  song: "song/zara-larsson-one-mississippi",
  carriedBy: [
    {
      release: "release/zara-larsson-so-good",
      discNumber: 1,
      position: 12,
      externalId: "7oArXBmMlLCtZdUkXWQZGs",
      externalLink: "https://open.spotify.com/track/7oArXBmMlLCtZdUkXWQZGs",
    },
  ],
} as const satisfies Track
