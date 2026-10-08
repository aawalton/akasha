import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeDangerousWoman = {
  id: "01a0676a-d71b-7064-8497-06ce340e5b8e",
  type: "page-type/release",
  slug: "ariana-grande-dangerous-woman",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2016-05-20",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5X7x18kW3mVIvnuNeedM6b",
      externalLink: "https://open.spotify.com/album/5X7x18kW3mVIvnuNeedM6b",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Dangerous Woman",
  createdAt: "2026-09-03T13:17:30.267Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
