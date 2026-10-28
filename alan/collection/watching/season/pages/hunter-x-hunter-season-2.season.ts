import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const hunterXHunterSeason2 = {
  id: "01a183d3-3a68-7657-a1c9-13f346afa707",
  type: "page-type/season",
  slug: "hunter-x-hunter-season-2",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/hunter-x-hunter"],
  position: 2,
  publishedAt: "2012-12-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "54606",
      externalLink: "https://www.themoviedb.org/tv/46298/season/2",
    },
  ],
  title: "Hunter x Hunter Season 2",
  posterPath: "/itMuFli5HRafl3ofO5srdN0mmCQ.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-28T18:43:40.765Z",
  updatedAt: "2026-10-28T18:43:40.765Z",
} as const satisfies Season
