import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaBornYesterday = {
  id: "01a0676a-d719-7025-8c33-455a95b45313",
  type: "page-type/release",
  slug: "sia-born-yesterday",
  title: "Born Yesterday",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 3.308817,
  ownProgress: 3.308817,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-10-04",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7mjYTOjmcH4UHnCdct2xZi",
      externalLink: "https://open.spotify.com/album/7mjYTOjmcH4UHnCdct2xZi",
      lastSyncedAt: "2025-11-27",
    },
  ],
} as const satisfies Release
