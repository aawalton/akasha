import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theApothecaryDiariesSeason1 = {
  id: "01a1447d-e744-754e-a2cf-12938db7c5ab",
  type: "page-type/season",
  slug: "the-apothecary-diaries-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/the-apothecary-diaries"],
  position: 1,
  publishedAt: "2023-10-22",
  status: "in-progress",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "329141",
      externalLink: "https://www.themoviedb.org/tv/220542/season/1",
    },
  ],
  title: "The Apothecary Diaries Season 1",
  posterPath: "/7qx7OwBZcI0dRWc8DrbtxY5IrlV.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-16T11:34:24.319Z",
  updatedAt: "2026-10-16T11:34:24.319Z",
} as const satisfies Season
