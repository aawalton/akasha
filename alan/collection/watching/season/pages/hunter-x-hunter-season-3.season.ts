import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const hunterXHunterSeason3 = {
  id: "01a183d3-3a68-786c-a1d7-1f842953d9b6",
  type: "page-type/season",
  slug: "hunter-x-hunter-season-3",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/hunter-x-hunter"],
  position: 3,
  publishedAt: "2014-07-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "77711",
      externalLink: "https://www.themoviedb.org/tv/46298/season/3",
    },
  ],
  title: "Hunter x Hunter Season 3",
  posterPath: "/eHv7DcRol9xrpwE14D4GuRdgcH0.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:43:40.765Z",
  updatedAt: "2026-10-28T18:43:40.765Z",
} as const satisfies Season
