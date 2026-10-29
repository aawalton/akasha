import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const cedarCoveSeason3 = {
  id: "01a18844-02b7-73f3-bc14-bf56643238cd",
  type: "page-type/season",
  slug: "cedar-cove-season-3",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/cedar-cove"],
  position: 3,
  publishedAt: "2015-07-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "67521",
      externalLink: "https://www.themoviedb.org/tv/47320/season/3",
    },
  ],
  title: "Cedar Cove Season 3",
  posterPath: "/oenaCIOaQQsdVA9VzAcC8eaRnBE.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:25:20.948Z",
  updatedAt: "2026-10-29T15:25:20.948Z",
} as const satisfies Season
