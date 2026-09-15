import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaThrowItAllAwayThrowItAllAway = {
  id: "01a0a59c-40a7-78bf-88e1-92a7b332f64e",
  type: "track",
  slug: "sia-throw-it-all-away-throw-it-all-away",
  ownLength: 4.026,
  ownProgress: 0,
  partOfCollections: ["release/sia-throw-it-all-away"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4TKsxa0QsDZxohhrzzEHuB",
      externalLink: "https://open.spotify.com/track/4TKsxa0QsDZxohhrzzEHuB",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Throw It All Away",
} as const satisfies Track
