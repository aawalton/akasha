import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const blackCloverSeason2 = {
  id: "01a183da-1968-7b1d-84c0-421a6da3513a",
  type: "page-type/season",
  slug: "black-clover-season-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/black-clover"],
  position: 2,
  publishedAt: "2026-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "547848",
      externalLink: "https://www.themoviedb.org/tv/73223/season/2",
    },
  ],
  title: "Black Clover Season 2",
  posterPath: "/k7XtJOiflFofEOP8l5i75y4p5po.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-28T18:51:11.067Z",
  updatedAt: "2026-10-28T18:51:11.067Z",
} as const satisfies Season
