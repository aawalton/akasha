import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekTheNextGenerationSeason7 = {
  id: "01a06802-b8bd-7020-b345-ef082b77e372",
  type: "page-type/season",
  slug: "star-trek-the-next-generation-season-7",
  title: "Star Trek: The Next Generation Season 7",
  partOfCollections: ["show/star-trek-the-next-generation"],
  position: 7,
  ownLength: 1216.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1993-09-21",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-the-next-generation/seasons/7",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
