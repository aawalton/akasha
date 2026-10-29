import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const cedarCoveSeason2 = {
  id: "01a18844-02b7-7953-98d5-5cc04638dec3",
  type: "page-type/season",
  slug: "cedar-cove-season-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/cedar-cove"],
  position: 2,
  publishedAt: "2014-07-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "62279",
      externalLink: "https://www.themoviedb.org/tv/47320/season/2",
    },
  ],
  title: "Cedar Cove Season 2",
  posterPath: "/adr5M7xXSZldwwhbi793w30ytO4.jpg",
  voteAverage: 2,
  createdAt: "2026-10-29T15:25:20.948Z",
  updatedAt: "2026-10-29T15:25:20.948Z",
} as const satisfies Season
