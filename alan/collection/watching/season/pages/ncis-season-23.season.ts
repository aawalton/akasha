import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisSeason23 = {
  id: "01a1884b-ef87-7d02-862f-1b3b12965370",
  type: "page-type/season",
  slug: "ncis-season-23",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/ncis"],
  position: 23,
  publishedAt: "2025-10-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "465505",
      externalLink: "https://www.themoviedb.org/tv/4614/season/23",
    },
  ],
  title: "NCIS Season 23",
  posterPath: "/tUgA3SSYS2eX1bUEhAFl5Brbtww.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Season
