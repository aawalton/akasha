import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const hunterXHunterSeason1 = {
  id: "01a183d3-3a68-7362-b8fb-87c1e540014f",
  type: "page-type/season",
  slug: "hunter-x-hunter-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/hunter-x-hunter"],
  position: 1,
  publishedAt: "2011-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "54607",
      externalLink: "https://www.themoviedb.org/tv/46298/season/1",
    },
  ],
  title: "Hunter x Hunter Season 1",
  posterPath: "/4jA40N280wb9NT7yjtFdcJND5aq.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-28T18:43:40.765Z",
  updatedAt: "2026-10-28T18:43:40.765Z",
} as const satisfies Season
