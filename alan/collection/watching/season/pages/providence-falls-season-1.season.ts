import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const providenceFallsSeason1 = {
  id: "01a18851-5087-7c03-8ba0-d7b155294c89",
  type: "page-type/season",
  slug: "providence-falls-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/providence-falls"],
  position: 1,
  publishedAt: "2025-08-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "468458",
      externalLink: "https://www.themoviedb.org/tv/297638/season/1",
    },
  ],
  title: "Providence Falls Season 1",
  posterPath: "/5CscqXPmBj5LIp5tv3u08Cn5DQw.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:39:52.838Z",
  updatedAt: "2026-10-29T15:39:52.838Z",
} as const satisfies Season
