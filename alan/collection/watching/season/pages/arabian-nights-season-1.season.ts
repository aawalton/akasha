import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const arabianNightsSeason1 = {
  id: "01a18843-205a-7c57-9c6a-b1004fc6f93a",
  type: "page-type/season",
  slug: "arabian-nights-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/arabian-nights"],
  position: 1,
  publishedAt: "2000-04-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "30657",
      externalLink: "https://www.themoviedb.org/tv/20658/season/1",
    },
  ],
  title: "Arabian Nights Season 1",
  posterPath: "/uyKLGQ7dQixbYXVp1nbYcjI0fzT.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:24:23.001Z",
  updatedAt: "2026-10-29T15:24:23.001Z",
} as const satisfies Season
