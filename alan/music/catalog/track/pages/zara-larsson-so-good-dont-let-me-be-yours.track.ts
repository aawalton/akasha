import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const zaraLarssonSoGoodDontLetMeBeYours = {
  id: "01a0aa7c-3335-7ae5-bb40-f1b26d2aae6a",
  type: "page-type/track",
  slug: "zara-larsson-so-good-dont-let-me-be-yours",
  ownLength: 3.3173833333333334,
  ownProgress: 0,
  partOfCollections: ["release/zara-larsson-so-good"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "65ACnVMmePTp8Xdk11jP2y",
      externalLink: "https://open.spotify.com/track/65ACnVMmePTp8Xdk11jP2y",
      lastSyncedAt: "2026-09-16",
    },
  ],
  title: "Don't Let Me Be Yours",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "1Xylc3o4UrD53lo9CvFvVg", artistName: "Zara Larsson" }],
  trackKey: "dontletmebeyours|1Xylc3o4UrD53lo9CvFvVg|199043",
} as const satisfies Track
