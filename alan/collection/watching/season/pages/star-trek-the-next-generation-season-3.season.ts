import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekTheNextGenerationSeason3 = {
  id: "01a06802-b8bd-701c-8cb2-09bf4e27dac4",
  type: "page-type/season",
  slug: "star-trek-the-next-generation-season-3",
  title: "Star Trek: The Next Generation Season 3",
  partOfCollections: ["show/star-trek-the-next-generation"],
  position: 3,
  ownLength: 1195.8,
  ownProgress: 1195.8,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "1989-09-26",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-the-next-generation/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
