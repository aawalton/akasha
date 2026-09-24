import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonVenusVenus = {
  id: "01a0aa7c-2bd0-70f3-86f0-d5a05ac6cc75",
  type: "page-type/track",
  slug: "zara-larsson-venus-venus",
  ownLength: 3.460183333333333,
  ownProgress: 3.460183333333333,
  partOfCollections: ["release/zara-larsson-venus"],
  status: "completed",
  unit: "unit/minutes",
  title: "Venus",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "venus|1Xylc3o4UrD53lo9CvFvVg|207611",
  song: "song/zara-larsson-venus",
  carriedBy: [
    {
      release: "release/zara-larsson-venus",
      discNumber: 1,
      position: 11,
      externalId: "1RaVANIegur4WaZTscvVS4",
      externalLink: "https://open.spotify.com/track/1RaVANIegur4WaZTscvVS4",
    },
  ],
} as const satisfies Track
