import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonBlueMoonBlueMoon = {
  id: "01a163de-95ae-7479-8cdf-b9f35a0698be",
  type: "page-type/track",
  slug: "zara-larsson-blue-moon-blue-moon",
  ownLength: 2.9590666666666667,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-blue-moon"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Blue Moon",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "bluemoon|1Xylc3o4UrD53lo9CvFvVg|177544",
  song: "song/zara-larsson-blue-moon",
  carriedBy: [
    {
      release: "release/zara-larsson-blue-moon",
      discNumber: 1,
      position: 1,
      externalId: "5EDHxPobOf50pYWwcwxI8y",
      externalLink: "https://open.spotify.com/track/5EDHxPobOf50pYWwcwxI8y",
    },
  ],
  createdAt: "2026-10-22T13:48:14.124Z",
  updatedAt: "2026-10-22T13:48:14.124Z",
} as const satisfies Track
