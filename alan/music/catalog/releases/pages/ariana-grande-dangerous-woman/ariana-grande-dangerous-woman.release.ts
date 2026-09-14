import type { Release } from "akasha/alan/music/catalog/releases/release.page-type.types.ts"

export const arianaGrandeDangerousWoman = {
  id: "01a0676a-d71b-7064-8497-06ce340e5b8e",
  type: "release",
  slug: "ariana-grande-dangerous-woman",
  title: "Dangerous Woman",
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  ownLength: 63.128367,
  ownProgress: 63.128367,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2016-05-20",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5X7x18kW3mVIvnuNeedM6b",
      externalLink: "https://open.spotify.com/album/5X7x18kW3mVIvnuNeedM6b",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Release
