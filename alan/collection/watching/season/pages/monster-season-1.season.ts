import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const monsterSeason1 = {
  id: "01a183d8-0269-7c16-b786-a92d507bcc99",
  type: "page-type/season",
  slug: "monster-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/monster"],
  position: 1,
  publishedAt: "2004-04-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "42537",
      externalLink: "https://www.themoviedb.org/tv/30981/season/1",
    },
  ],
  title: "Monster Season 1",
  posterPath: "/9cyxsN3LV8T9aY37ycZgZ31HY26.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-28T18:48:54.116Z",
  updatedAt: "2026-10-28T18:48:54.116Z",
} as const satisfies Season
