import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const gintamaSeason4 = {
  id: "01a183d6-3279-7ed1-b870-ea5c2ce8c3a6",
  type: "page-type/season",
  slug: "gintama-season-4",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/gintama"],
  position: 4,
  publishedAt: "2009-04-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "58343",
      externalLink: "https://www.themoviedb.org/tv/57041/season/4",
    },
  ],
  title: "Gintama Season 4",
  posterPath: "/yB3OhOKMJyBI5fPomVorOvMvtBO.jpg",
  voteAverage: 9,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Season
