import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonSoGoodFuneral = {
  id: "01a0aa7c-33b7-7de6-adfe-4ede362829c6",
  type: "page-type/track",
  slug: "zara-larsson-so-good-funeral",
  ownLength: 3.594,
  ownProgress: 3.594,
  partOfCollections: ["release/zara-larsson-so-good"],
  status: "completed",
  unit: "unit/minutes",
  title: "Funeral",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "funeral|1Xylc3o4UrD53lo9CvFvVg|215640",
  song: "song/zara-larsson-funeral",
  carriedBy: [
    {
      release: "release/zara-larsson-so-good",
      discNumber: 1,
      position: 13,
      externalId: "75gU1E0ou9Kf8GBVwGs1Xk",
      externalLink: "https://open.spotify.com/track/75gU1E0ou9Kf8GBVwGs1Xk",
    },
  ],
} as const satisfies Track
