import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisLosAngelesSpecials = {
  id: "01a06802-b8bb-7018-b9a3-ee2dffb005dd",
  type: "page-type/season",
  slug: "ncis-los-angeles-specials",
  title: "NCIS: Los Angeles Specials",
  partOfCollections: ["show/ncis-los-angeles"],
  position: 0,
  ownLength: 43.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2023-05-22",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-29184",
      externalLink: "https://trakt.tv/shows/ncis-los-angeles/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
