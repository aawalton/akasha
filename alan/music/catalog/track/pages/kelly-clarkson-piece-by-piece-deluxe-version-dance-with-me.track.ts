import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonPieceByPieceDeluxeVersionDanceWithMe = {
  id: "01a0a5ae-bf87-7cbd-8fed-199e13f31922",
  type: "track",
  slug: "kelly-clarkson-piece-by-piece-deluxe-version-dance-with-me",
  ownLength: 4.3423,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-piece-by-piece-deluxe-version"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5UMQdaY6Rxu1ZrsWwIBnHv",
      externalLink: "https://open.spotify.com/track/5UMQdaY6Rxu1ZrsWwIBnHv",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Dance With Me",
} as const satisfies Track
