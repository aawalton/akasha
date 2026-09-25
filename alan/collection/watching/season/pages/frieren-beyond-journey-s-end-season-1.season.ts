import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const frierenBeyondJourneySEndSeason1 = {
  id: "01a06802-b8ba-700e-8cb1-08b1ad71026b",
  type: "page-type/season",
  slug: "frieren-beyond-journey-s-end-season-1",
  title: "Frieren: Beyond Journey's End Season 1",
  partOfCollections: ["show/frieren-beyond-journey-s-end-2"],
  position: 1,
  ownLength: 700.8,
  ownProgress: 700.8,
  unit: "unit/minutes",
  status: "completed",
  grade: "S",
  publishedAt: "2023-09-29",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/frieren-beyond-journey-s-end/seasons/1",
      lastSyncedAt: "2025-12-20",
    },
  ],
} as const satisfies Season
