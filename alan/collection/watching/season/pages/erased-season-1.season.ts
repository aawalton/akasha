import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const erasedSeason1 = {
  id: "01a183d8-0f21-76ec-a8b6-a56cbc758cb4",
  type: "page-type/season",
  slug: "erased-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/erased"],
  position: 1,
  publishedAt: "2016-01-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "73789",
      externalLink: "https://www.themoviedb.org/tv/65249/season/1",
    },
  ],
  title: "ERASED Season 1",
  posterPath: "/9jEkIqyxrlUNmDswPHaAt80O8wD.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:48:57.376Z",
  updatedAt: "2026-10-28T18:48:57.376Z",
} as const satisfies Season
