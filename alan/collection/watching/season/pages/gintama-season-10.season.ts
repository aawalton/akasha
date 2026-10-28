import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const gintamaSeason10 = {
  id: "01a183d6-3279-7c5c-b0a3-36e7ea56011f",
  type: "page-type/season",
  slug: "gintama-season-10",
  description: "Final arc of Gintama.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/gintama"],
  position: 10,
  publishedAt: "2018-01-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "96990",
      externalLink: "https://www.themoviedb.org/tv/57041/season/10",
    },
  ],
  title: "Gintama. - Silver Soul Arc",
  posterPath: "/p0cV9CrAHfAyWXMntCGoBZGEXtC.jpg",
  voteAverage: 9,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Season
