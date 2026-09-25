import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekTheNextGenerationSeason2 = {
  id: "01a06802-b8bd-701b-906e-00bdeb12738c",
  type: "page-type/season",
  slug: "star-trek-the-next-generation-season-2",
  title: "Star Trek: The Next Generation Season 2",
  partOfCollections: ["show/star-trek-the-next-generation"],
  position: 2,
  ownLength: 1011,
  ownProgress: 1011,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "1988-11-22",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-the-next-generation/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
