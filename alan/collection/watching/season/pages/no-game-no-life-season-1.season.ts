import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const noGameNoLifeSeason1 = {
  id: "01a183dd-2716-7848-95b4-3bdc5679e76d",
  type: "page-type/season",
  slug: "no-game-no-life-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/no-game-no-life"],
  position: 1,
  publishedAt: "2014-04-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "60790",
      externalLink: "https://www.themoviedb.org/tv/60808/season/1",
    },
  ],
  title: "No Game No Life Season 1",
  posterPath: "/pOKKy6ofj0iJbQcEOW6eDrBQnHb.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-28T18:54:31.189Z",
  updatedAt: "2026-10-28T18:54:31.189Z",
} as const satisfies Season
