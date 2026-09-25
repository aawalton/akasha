import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const sheHulkAttorneyAtLawMiniseries = {
  id: "01a06802-b8bc-7038-89f3-4775d5622458",
  type: "page-type/season",
  slug: "she-hulk-attorney-at-law-miniseries",
  title: "She-Hulk: Attorney at Law Miniseries",
  partOfCollections: ["show/she-hulk-attorney-at-law"],
  position: 1,
  ownLength: 309,
  ownProgress: 309,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-08-18",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-240816",
      externalLink: "https://trakt.tv/shows/she-hulk-attorney-at-law/seasons/1",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
