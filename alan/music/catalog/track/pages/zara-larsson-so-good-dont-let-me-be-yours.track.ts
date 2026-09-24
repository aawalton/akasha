import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonSoGoodDontLetMeBeYours = {
  id: "01a0aa7c-3335-7ae5-bb40-f1b26d2aae6a",
  type: "page-type/track",
  slug: "zara-larsson-so-good-dont-let-me-be-yours",
  ownLength: 3.3173833333333334,
  ownProgress: 3.3173833333333334,
  partOfCollections: ["release/zara-larsson-so-good"],
  status: "completed",
  unit: "unit/minutes",
  title: "Don't Let Me Be Yours",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/zara-larsson" }],
  trackKey: "dontletmebeyours|1Xylc3o4UrD53lo9CvFvVg|199043",
  song: "song/zara-larsson-don-t-let-me-be-yours",
  carriedBy: [
    {
      release: "release/zara-larsson-so-good",
      discNumber: 1,
      position: 9,
      externalId: "65ACnVMmePTp8Xdk11jP2y",
      externalLink: "https://open.spotify.com/track/65ACnVMmePTp8Xdk11jP2y",
    },
  ],
} as const satisfies Track
