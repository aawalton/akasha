import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonVenusEscape = {
  id: "01a0aa7c-2b8d-759e-8deb-459ef23b1a37",
  type: "page-type/track",
  slug: "zara-larsson-venus-escape",
  ownLength: 3.24545,
  ownProgress: 3.24545,
  partOfCollections: ["release/zara-larsson-venus"],
  status: "completed",
  unit: "unit/minutes",
  title: "Escape",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "escape|1Xylc3o4UrD53lo9CvFvVg|194727",
  song: "song/zara-larsson-escape",
  carriedBy: [
    {
      release: "release/zara-larsson-venus",
      discNumber: 1,
      position: 9,
      externalId: "10ky5LMbNGGXlHbfniwRmC",
      externalLink: "https://open.spotify.com/track/10ky5LMbNGGXlHbfniwRmC",
    },
  ],
} as const satisfies Track
