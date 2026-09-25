import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const frierenBeyondJourneySEndSpecials = {
  id: "01a06802-b8ba-7010-90c1-8f3f237915a6",
  type: "page-type/season",
  slug: "frieren-beyond-journey-s-end-specials",
  title: "Frieren: Beyond Journey's End Specials",
  partOfCollections: ["show/frieren-beyond-journey-s-end-2"],
  position: 0,
  ownLength: 54,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2023-10-11",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "0",
      externalLink: "https://trakt.tv/shows/frieren-beyond-journey-s-end/seasons/0",
      lastSyncedAt: "2026-01-02",
    },
  ],
} as const satisfies Season
