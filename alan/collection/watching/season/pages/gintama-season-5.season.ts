import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const gintamaSeason5 = {
  id: "01a183d6-3279-7a47-95af-a85294fb58f8",
  type: "page-type/season",
  slug: "gintama-season-5",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/gintama"],
  position: 5,
  publishedAt: "2011-04-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "58341",
      externalLink: "https://www.themoviedb.org/tv/57041/season/5",
    },
  ],
  title: "Gintama'",
  posterPath: "/aMbvgkCFYzrIE3iWq2dKF78obJQ.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-28T18:46:55.326Z",
  updatedAt: "2026-10-28T18:46:55.326Z",
} as const satisfies Season
