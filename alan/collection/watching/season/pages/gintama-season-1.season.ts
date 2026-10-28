import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const gintamaSeason1 = {
  id: "01a183d6-3278-7f50-b49e-ee24d71edc38",
  type: "page-type/season",
  slug: "gintama-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/gintama"],
  position: 1,
  publishedAt: "2006-04-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "58339",
      externalLink: "https://www.themoviedb.org/tv/57041/season/1",
    },
  ],
  title: "Gintama Season 1",
  posterPath: "/pKPMbL4LxqXTBYpqZd4az5Y95Mr.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Season
