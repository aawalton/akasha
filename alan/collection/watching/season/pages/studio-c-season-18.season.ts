import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const studioCSeason18 = {
  id: "01a06802-b8be-701d-978e-88848167e300",
  type: "page-type/season",
  slug: "studio-c-season-18",
  title: "Studio C Season 18",
  partOfCollections: ["show/studio-c"],
  position: 18,
  ownLength: 217.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-03-05",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-417208",
      externalLink: "https://trakt.tv/shows/studio-c/seasons/18",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
