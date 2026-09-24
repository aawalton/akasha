import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonSoGoodLushLife = {
  id: "01a0aa7c-3242-7c77-a427-e64ba8f51acd",
  type: "page-type/track",
  slug: "zara-larsson-so-good-lush-life",
  ownLength: 3.3441,
  ownProgress: 3.3441,
  partOfCollections: ["release/zara-larsson-so-good"],
  status: "completed",
  unit: "unit/minutes",
  title: "Lush Life",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "lushlife|1Xylc3o4UrD53lo9CvFvVg|200646",
  song: "song/zara-larsson-lush-life",
  carriedBy: [
    {
      release: "release/zara-larsson-so-good",
      discNumber: 1,
      position: 2,
      externalId: "1rIKgCH4H52lrvDcz50hS8",
      externalLink: "https://open.spotify.com/track/1rIKgCH4H52lrvDcz50hS8",
    },
  ],
} as const satisfies Track
