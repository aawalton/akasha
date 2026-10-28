import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const gintamaSeason2 = {
  id: "01a183d6-3279-77ca-9a51-cf878eeb8d49",
  type: "page-type/season",
  slug: "gintama-season-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/gintama"],
  position: 2,
  publishedAt: "2007-04-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "58340",
      externalLink: "https://www.themoviedb.org/tv/57041/season/2",
    },
  ],
  title: "Gintama Season 2",
  posterPath: "/wz17KKPIGWyRnfRnqssAsaWKo0N.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Season
