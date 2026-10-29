import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theChosenSeason2 = {
  id: "01a06802-b8bf-7005-87f8-8fed41fdb954",
  type: "page-type/season",
  slug: "the-chosen-season-2",
  title: "The Chosen Season 2",
  partOfCollections: ["show/the-chosen"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-04-04",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-235402",
      externalLink: "https://trakt.tv/shows/the-chosen/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-10-29T15:45:38.921Z",
} as const satisfies Season
