import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const lovelyComplexSeason1 = {
  id: "01a183da-3073-7332-bd4d-5992d037fc8e",
  type: "page-type/season",
  slug: "lovely-complex-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/lovely-complex"],
  position: 1,
  publishedAt: "2007-04-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "37951",
      externalLink: "https://www.themoviedb.org/tv/27167/season/1",
    },
  ],
  title: "Lovely★Complex Season 1",
  posterPath: "/xpzFuva05nc8jjxP3AsomC7aBDf.jpg",
  voteAverage: 0,
  createdAt: "2026-10-28T18:51:16.977Z",
  updatedAt: "2026-10-28T18:51:16.977Z",
} as const satisfies Season
