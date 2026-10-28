import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const psychoPassSeason3 = {
  id: "01a183da-9e72-7d2e-a07b-6c08a5b80443",
  type: "page-type/season",
  slug: "psycho-pass-season-3",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/psycho-pass"],
  position: 3,
  publishedAt: "2019-10-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "132339",
      externalLink: "https://www.themoviedb.org/tv/43865/season/3",
    },
  ],
  title: "Psycho-Pass Season 3",
  posterPath: "/yPUSYmmL7bFMJP1grAGnJhHSJMX.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-28T18:51:45.135Z",
  updatedAt: "2026-10-28T18:51:45.135Z",
} as const satisfies Season
