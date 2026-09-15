import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaColourTheSmallOneWhereIBelong = {
  id: "01a0a59c-1028-7d52-a87d-b0497d6eb8ae",
  type: "track",
  slug: "sia-colour-the-small-one-where-i-belong",
  ownLength: 4.748883333333334,
  ownProgress: 0,
  partOfCollections: ["release/sia-colour-the-small-one"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7r66gMjXH5euA5unHhIJyL",
      externalLink: "https://open.spotify.com/track/7r66gMjXH5euA5unHhIJyL",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Where I Belong",
} as const satisfies Track
