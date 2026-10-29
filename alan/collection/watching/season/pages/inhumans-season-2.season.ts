import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const inhumansSeason2 = {
  id: "01a18849-ba10-7fa5-9963-3329a1e4d3ae",
  type: "page-type/season",
  slug: "inhumans-season-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/inhumans"],
  position: 2,
  publishedAt: "2026-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "477468",
      externalLink: "https://www.themoviedb.org/tv/276288/season/2",
    },
  ],
  title: "Inhumans Season 2",
  posterPath: "/edCc7fsPUERfsYr31dlNsSMUbxA.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:31:35.566Z",
  updatedAt: "2026-10-29T15:31:35.566Z",
} as const satisfies Season
