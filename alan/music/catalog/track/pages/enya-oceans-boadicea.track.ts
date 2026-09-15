import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaOceansBoadicea = {
  id: "01a0a5b0-2d9e-7b1e-8e09-a21b2a9d47f6",
  type: "page-type/track",
  slug: "enya-oceans-boadicea",
  ownLength: 3.4617666666666667,
  ownProgress: 0,
  partOfCollections: ["release/enya-oceans"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5N1mFNwwZzUSq3AEMZSFCQ",
      externalLink: "https://open.spotify.com/track/5N1mFNwwZzUSq3AEMZSFCQ",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Boadicea",
} as const satisfies Track
