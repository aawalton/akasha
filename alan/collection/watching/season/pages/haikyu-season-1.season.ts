import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const haikyuSeason1 = {
  id: "01a183d2-cc4d-7214-bff1-c8c7e6b30844",
  type: "page-type/season",
  slug: "haikyu-season-1",
  description:
    "Two boys who were bitter volleyball rivals in middle school join forces on their high school team to take on other schools with a vengeance.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/haikyu"],
  position: 1,
  publishedAt: "2014-04-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "60937",
      externalLink: "https://www.themoviedb.org/tv/60863/season/1",
    },
  ],
  title: "Haikyu!! Season 1",
  posterPath: "/1Rfa9o5H6ZlXzbDVNlw4jULdXpi.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-28T18:43:12.581Z",
  updatedAt: "2026-10-28T18:43:12.581Z",
} as const satisfies Season
