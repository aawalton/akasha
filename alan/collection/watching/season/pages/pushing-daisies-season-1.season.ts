import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const pushingDaisiesSeason1 = {
  id: "01a06802-b8bc-701b-ba2d-7f0e9b1ef6fc",
  type: "page-type/season",
  slug: "pushing-daisies-season-1",
  title: "Pushing Daisies Season 1",
  partOfCollections: ["show/pushing-daisies"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2007-10-04",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-16202",
      externalLink: "https://trakt.tv/shows/pushing-daisies/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.964Z",
  updatedAt: "2026-10-29T16:29:56.379Z",
  progressedAt: "2026-10-29T16:29:56.379Z",
} as const satisfies Season
