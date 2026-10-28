import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const gintamaSeason8 = {
  id: "01a183d6-3279-7fdb-a763-d9a3b9a6935d",
  type: "page-type/season",
  slug: "gintama-season-8",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/gintama"],
  position: 8,
  publishedAt: "2017-01-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "83672",
      externalLink: "https://www.themoviedb.org/tv/57041/season/8",
    },
  ],
  title: "Gintama.",
  posterPath: "/v06DypXDQplY3RGs49yywTnFPS2.jpg",
  voteAverage: 9.2,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Season
