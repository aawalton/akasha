import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theMonkeyKingSeason1 = {
  id: "01a18857-876f-7ac0-be55-62df35e06829",
  type: "page-type/season",
  slug: "the-monkey-king-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/the-monkey-king"],
  position: 1,
  publishedAt: "2001-03-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "99565",
      externalLink: "https://www.themoviedb.org/tv/45613/season/1",
    },
  ],
  title: "Miniseries",
  posterPath: "/oM8xfznHMEitReyLWZAr4LNGBYl.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:46:40.110Z",
  updatedAt: "2026-10-29T15:46:40.110Z",
} as const satisfies Season
