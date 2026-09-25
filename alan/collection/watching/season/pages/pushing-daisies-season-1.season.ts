import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const pushingDaisiesSeason1 = {
  id: "01a06802-b8bc-701b-ba2d-7f0e9b1ef6fc",
  type: "page-type/season",
  slug: "pushing-daisies-season-1",
  title: "Pushing Daisies Season 1",
  partOfCollections: ["show/pushing-daisies"],
  position: 1,
  ownLength: 376.2,
  ownProgress: 376.2,
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
} as const satisfies Season
