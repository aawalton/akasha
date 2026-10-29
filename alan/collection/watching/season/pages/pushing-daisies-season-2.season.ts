import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const pushingDaisiesSeason2 = {
  id: "01a06802-b8bc-701c-a6fe-6cdcdb1cd780",
  type: "page-type/season",
  slug: "pushing-daisies-season-2",
  title: "Pushing Daisies Season 2",
  partOfCollections: ["show/pushing-daisies"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
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
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T16:29:56.379Z",
  progressedAt: "2026-10-29T16:29:56.379Z",
} as const satisfies Season
