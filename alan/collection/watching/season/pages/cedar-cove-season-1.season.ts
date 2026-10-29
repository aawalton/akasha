import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const cedarCoveSeason1 = {
  id: "01a18844-02b7-70bb-bb0c-f04617eb9c8b",
  type: "page-type/season",
  slug: "cedar-cove-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/cedar-cove"],
  position: 1,
  publishedAt: "2013-07-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "55120",
      externalLink: "https://www.themoviedb.org/tv/47320/season/1",
    },
  ],
  title: "Cedar Cove Season 1",
  posterPath: "/i1A5QoINUlwOdshxYUbGtgifcze.jpg",
  voteAverage: 2,
  createdAt: "2026-10-29T15:25:20.948Z",
  updatedAt: "2026-10-29T15:25:20.948Z",
} as const satisfies Season
