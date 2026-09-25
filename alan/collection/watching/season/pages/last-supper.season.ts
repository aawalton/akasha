import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const lastSupper = {
  id: "01a06802-b8ba-702f-9208-6a3891f5bdd1",
  type: "page-type/season",
  slug: "last-supper",
  title: "Last Supper",
  partOfCollections: ["show/the-chosen"],
  position: 5,
  ownLength: 463.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-06-15",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-431829",
      externalLink: "https://trakt.tv/shows/the-chosen/seasons/5",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
