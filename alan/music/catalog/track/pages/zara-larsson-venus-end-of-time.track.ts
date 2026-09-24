import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonVenusEndOfTime = {
  id: "01a0aa7c-2b44-7d42-adf7-af52172b07f2",
  type: "page-type/track",
  slug: "zara-larsson-venus-end-of-time",
  ownLength: 3.4967166666666665,
  ownProgress: 3.4967166666666665,
  partOfCollections: ["release/zara-larsson-venus"],
  status: "completed",
  unit: "unit/minutes",
  title: "End Of Time",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "endoftime|1Xylc3o4UrD53lo9CvFvVg|209803",
  song: "song/zara-larsson-end-of-time",
  carriedBy: [
    {
      release: "release/zara-larsson-venus",
      discNumber: 1,
      position: 7,
      externalId: "42od6nOeV32g5uNwz17xq5",
      externalLink: "https://open.spotify.com/track/42od6nOeV32g5uNwz17xq5",
    },
  ],
} as const satisfies Track
