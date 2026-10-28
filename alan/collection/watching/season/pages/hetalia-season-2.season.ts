import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const hetaliaSeason2 = {
  id: "01a183d7-7ce7-7ed4-a350-2f881adda594",
  type: "page-type/season",
  slug: "hetalia-season-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/hetalia"],
  position: 2,
  publishedAt: "2009-07-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "45900",
      externalLink: "https://www.themoviedb.org/tv/35138/season/2",
    },
  ],
  title: "Axis Powers 2",
  posterPath: "/3eil5mpjaLagqd3c6rT0VNby1p.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Season
