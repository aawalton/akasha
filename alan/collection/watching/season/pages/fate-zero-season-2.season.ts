import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const fateZeroSeason2 = {
  id: "01a183d9-38a0-7f13-8e97-03ab098f2612",
  type: "page-type/season",
  slug: "fate-zero-season-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/fate-zero"],
  position: 2,
  publishedAt: "2012-04-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "54285",
      externalLink: "https://www.themoviedb.org/tv/45845/season/2",
    },
  ],
  title: "Fate/Zero Season 2",
  posterPath: "/5AM2U3a84GpXLv2ENTyQDTYEgpZ.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-28T18:50:13.534Z",
  updatedAt: "2026-10-28T18:50:13.534Z",
} as const satisfies Season
