import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const pushingDaisiesSeason2 = {
  id: "01a06802-b8bc-701c-a6fe-6cdcdb1cd780",
  type: "page-type/season",
  slug: "pushing-daisies-season-2",
  title: "Pushing Daisies Season 2",
  partOfCollections: ["show/pushing-daisies"],
  position: 2,
  ownLength: 553.2,
  ownProgress: 553.2,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2008-10-02",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-16203",
      externalLink: "https://trakt.tv/shows/pushing-daisies/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
