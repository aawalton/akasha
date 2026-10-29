import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const holidazedSeason1 = {
  id: "01a18849-8998-7324-84b3-9fdbcb58994a",
  type: "page-type/season",
  slug: "holidazed-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/holidazed"],
  position: 1,
  publishedAt: "2024-11-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "342715",
      externalLink: "https://www.themoviedb.org/tv/227311/season/1",
    },
  ],
  title: "Holidazed Season 1",
  posterPath: "/wl4XXLMt884JOwatn1tJhC61P7M.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:31:23.159Z",
  updatedAt: "2026-10-29T15:31:23.159Z",
} as const satisfies Season
