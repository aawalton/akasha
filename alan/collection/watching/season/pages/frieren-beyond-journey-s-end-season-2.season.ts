import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const frierenBeyondJourneySEndSeason2 = {
  id: "01a06802-b8ba-700f-877d-7540b888caaa",
  type: "page-type/season",
  slug: "frieren-beyond-journey-s-end-season-2",
  title: "Frieren: Beyond Journey's End Season 2",
  partOfCollections: ["show/frieren-beyond-journey-s-end-2"],
  position: 2,
  ownLength: 25,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2026-01-16",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "2",
      externalLink: "https://trakt.tv/shows/frieren-beyond-journey-s-end/seasons/2",
      lastSyncedAt: "2026-01-02",
    },
  ],
} as const satisfies Season
