import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const chesapeakeShoresSeason3 = {
  id: "01a18844-1d37-7abd-9aef-d3bc34b881f2",
  type: "page-type/season",
  slug: "chesapeake-shores-season-3",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/chesapeake-shores"],
  position: 3,
  publishedAt: "2018-08-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "107415",
      externalLink: "https://www.themoviedb.org/tv/67265/season/3",
    },
  ],
  title: "Chesapeake Shores Season 3",
  posterPath: "/A9fxrWWyRb7V2UxRyyOxQ6D3wGW.jpg",
  voteAverage: 1,
  createdAt: "2026-10-29T15:25:27.731Z",
  updatedAt: "2026-10-29T15:25:27.731Z",
} as const satisfies Season
