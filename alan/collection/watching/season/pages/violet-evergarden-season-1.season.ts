import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const violetEvergardenSeason1 = {
  id: "01a183d5-4982-74c3-9cf2-32be8eef8357",
  type: "page-type/season",
  slug: "violet-evergarden-season-1",
  description:
    "The war is over, and Violet Evergarden needs a job. Scarred and emotionless, she takes a job as a letter writer to understand herself and her past.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/violet-evergarden"],
  position: 1,
  publishedAt: "2018-01-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "95592",
      externalLink: "https://www.themoviedb.org/tv/75214/season/1",
    },
  ],
  title: "Violet Evergarden Season 1",
  posterPath: "/g7BpD4B5jN4D0AAuI5v0hdfaZIN.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:45:55.713Z",
  updatedAt: "2026-10-28T18:45:55.713Z",
} as const satisfies Season
