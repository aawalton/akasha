import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theChosenSeason4 = {
  id: "01a06802-b8bf-7007-a5fc-a03aaa745225",
  type: "page-type/season",
  slug: "the-chosen-season-4",
  title: "The Chosen Season 4",
  partOfCollections: ["show/the-chosen"],
  position: 4,
  ownLength: 553.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-06-02",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-338774",
      externalLink: "https://trakt.tv/shows/the-chosen/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
