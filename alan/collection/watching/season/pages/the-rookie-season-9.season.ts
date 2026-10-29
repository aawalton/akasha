import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theRookieSeason9 = {
  id: "01a18858-0371-7dfd-b4bc-d8de4d9c8d08",
  type: "page-type/season",
  slug: "the-rookie-season-9",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/the-rookie"],
  position: 9,
  publishedAt: "2027-01-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "514233",
      externalLink: "https://www.themoviedb.org/tv/79744/season/9",
    },
  ],
  title: "The Rookie Season 9",
  voteAverage: 0,
  createdAt: "2026-10-29T15:47:11.854Z",
  updatedAt: "2026-10-29T15:47:11.854Z",
} as const satisfies Season
