import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theLadyMusketeerSeason1 = {
  id: "01a18842-dcba-7178-b2cf-bb3a0b750ba0",
  type: "page-type/season",
  slug: "the-lady-musketeer-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/the-lady-musketeer"],
  position: 1,
  publishedAt: "2004-06-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "98165",
      externalLink: "https://www.themoviedb.org/tv/76518/season/1",
    },
  ],
  title: "Miniseries",
  posterPath: "/jgDdDTKJrjWV4zsRtC4Q8l6Xi7q.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:24:05.689Z",
  updatedAt: "2026-10-29T15:24:05.689Z",
} as const satisfies Season
