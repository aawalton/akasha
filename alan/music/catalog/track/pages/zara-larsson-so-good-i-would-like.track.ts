import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonSoGoodIWouldLike = {
  id: "01a0aa7c-3270-735f-b0a1-dbe9c29a2a38",
  type: "page-type/track",
  slug: "zara-larsson-so-good-i-would-like",
  ownLength: 3.7429333333333332,
  ownProgress: 3.7429333333333332,
  partOfCollections: ["release/zara-larsson-so-good"],
  status: "completed",
  unit: "unit/minutes",
  title: "I Would Like",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "iwouldlike|1Xylc3o4UrD53lo9CvFvVg|224576",
  song: "song/zara-larsson-i-would-like",
  carriedBy: [
    {
      release: "release/zara-larsson-so-good",
      discNumber: 1,
      position: 3,
      externalId: "4Q4jmPHwu0wrJvqrld0FQ6",
      externalLink: "https://open.spotify.com/track/4Q4jmPHwu0wrJvqrld0FQ6",
    },
  ],
} as const satisfies Track
