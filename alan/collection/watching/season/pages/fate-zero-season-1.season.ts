import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const fateZeroSeason1 = {
  id: "01a183d9-38a0-7ee7-9e64-f3507959fe33",
  type: "page-type/season",
  slug: "fate-zero-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/fate-zero"],
  position: 1,
  publishedAt: "2011-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "54286",
      externalLink: "https://www.themoviedb.org/tv/45845/season/1",
    },
  ],
  title: "Fate/Zero Season 1",
  posterPath: "/qRN0Gow4Ht0ScQMTfGXjqjS5HiF.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:50:13.534Z",
  updatedAt: "2026-10-28T18:50:13.534Z",
} as const satisfies Season
