import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonWowWow = {
  id: "01a0aa7c-3ed6-76ae-a5f1-dd09afcf567e",
  type: "page-type/track",
  slug: "zara-larsson-wow-wow",
  ownLength: 2.9945833333333334,
  ownProgress: 2.9945833333333334,
  partOfCollections: ["release/zara-larsson-wow"],
  status: "completed",
  unit: "unit/minutes",
  title: "WOW",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "wow|1Xylc3o4UrD53lo9CvFvVg|179675",
  song: "song/zara-larsson-wow",
  carriedBy: [
    {
      release: "release/zara-larsson-wow",
      discNumber: 1,
      position: 1,
      externalId: "3O8b0dDy1Z8BNM81U8DE1j",
      externalLink: "https://open.spotify.com/track/3O8b0dDy1Z8BNM81U8DE1j",
    },
  ],
} as const satisfies Track
