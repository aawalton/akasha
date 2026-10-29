import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theChosenSeason1 = {
  id: "01a06802-b8bf-7004-a298-c059895c0c17",
  type: "page-type/season",
  slug: "the-chosen-season-1",
  title: "The Chosen Season 1",
  partOfCollections: ["show/the-chosen"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2019-04-21",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-204073",
      externalLink: "https://trakt.tv/shows/the-chosen/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.967Z",
  updatedAt: "2026-10-29T15:45:38.921Z",
} as const satisfies Season
