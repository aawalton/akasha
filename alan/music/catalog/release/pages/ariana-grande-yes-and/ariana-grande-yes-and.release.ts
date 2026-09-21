import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeYesAnd = {
  id: "01a0676a-d731-704b-b895-e0f4e3c8fbea",
  type: "page-type/release",
  slug: "ariana-grande-yes-and",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2024-01-18",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6mNdtZhr5zcz2SLzyPxweY",
      externalLink: "https://open.spotify.com/album/6mNdtZhr5zcz2SLzyPxweY",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "yes, and?",
} as const satisfies Release
