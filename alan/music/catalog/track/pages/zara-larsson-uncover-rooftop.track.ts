import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonUncoverRooftop = {
  id: "01a0aa7c-42eb-7ec1-aa38-79b4c9f50ecf",
  type: "page-type/track",
  slug: "zara-larsson-uncover-rooftop",
  ownLength: 3.9922666666666666,
  ownProgress: 3.9922666666666666,
  partOfCollections: ["release/zara-larsson-uncover"],
  status: "completed",
  unit: "unit/minutes",
  title: "Rooftop",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "rooftop|1Xylc3o4UrD53lo9CvFvVg|239536",
  song: "song/zara-larsson-rooftop",
  carriedBy: [
    {
      release: "release/zara-larsson-uncover",
      discNumber: 1,
      position: 6,
      externalId: "4JKdEJW98WkBcBi6cB0d89",
      externalLink: "https://open.spotify.com/track/4JKdEJW98WkBcBi6cB0d89",
    },
  ],
} as const satisfies Track
